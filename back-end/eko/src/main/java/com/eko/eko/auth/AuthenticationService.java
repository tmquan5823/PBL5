package com.eko.eko.auth;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;

import com.eko.eko.config.JwtService;
import com.eko.eko.money.model.Category;
import com.eko.eko.token.Token;
import com.eko.eko.token.TokenRepository;
import com.eko.eko.token.TokenType;
import com.eko.eko.user.entity.Role;
import com.eko.eko.user.entity.User;
import com.eko.eko.user.repository.UserRepository;
import com.eko.eko.util.DefaultCategories;
import com.eko.eko.util.EmailUtil;
import com.eko.eko.util.OtpUtil;

import java.time.Duration;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository repository;
        private final TokenRepository tokenRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final OtpUtil otpUtil;
        private final EmailUtil emailUtil;
        private final DefaultCategories defaultCategories;

        public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) throws JsonProcessingException {
                boolean existedUser = repository.findByEmail(request.getEmail())
                                .isEmpty();
                if (existedUser == false) {
                        return new ResponseEntity<>(AuthenticationResponse.builder()
                                        .message("Có người đã đăng ký bằng mail này rồi!!!")
                                        .build(), HttpStatus.BAD_REQUEST);
                }

                var user = User.builder()
                                .address(request.getAddress())
                                .email(request.getEmail())
                                .isDelete(false)
                                .password(passwordEncoder.encode(request.getPassword()))
                                .telephone(request.getTelephone())
                                .avatarUrl("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")
                                .firstname(request.getFirstname())
                                .lastname(request.getLastname())
                                .canResetPassword(false)
                                .role(Role.USER)
                                .isVerify(false)
                                .build();
                List<Category> categories = defaultCategories.createListCategoriesDefault(user);
                user.setCategories(categories);
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                var jwtRefreshToken = jwtService.generateRefreshToken(user);
                saveUserToken(user, jwtToken);
                return new ResponseEntity<>(AuthenticationResponse.builder()
                                .accessToken(jwtToken)
                                .refreshToken(jwtRefreshToken)
                                .avatarUrl("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")
                                .role(Role.USER.name())
                                .message("Đăng ký thành công!!!")
                                .state(true)
                                .id(user.getId())
                                .build(), HttpStatus.OK);
        }

        private void saveUserToken(User user, String jwtToken) {
                var token = Token.builder()
                                .user(user)
                                .token(jwtToken)
                                .tokenType(TokenType.BEARER)
                                .expired(false)
                                .revoked(false)
                                .build();
                tokenRepository.save(token);
        }

        public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request) {

                try {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(request.getEmail(),
                                                        request.getPassword()));
                } catch (BadCredentialsException ex) {
                        // Xử lý khi xác thực thất bại (sai email hoặc mật khẩu)
                        return new ResponseEntity<>(AuthenticationResponse.builder()
                                        .message("Sai mật khẩu hoặc mail!!")
                                        .state(false)
                                        .build(), HttpStatus.OK);
                }

                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                if (user.isVerify() == false) {
                        return new ResponseEntity<>(AuthenticationResponse.builder()
                                        .message("Cần xác thực mail!!!")
                                        .build(), HttpStatus.BAD_REQUEST);
                }
                var jwtToken = jwtService.generateToken(user);
                var jwtRefreshToken = jwtService.generateRefreshToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, jwtToken);
                return new ResponseEntity<>(AuthenticationResponse.builder()
                                .accessToken(jwtToken)
                                .refreshToken(jwtRefreshToken)
                                .avatarUrl(user.getAvatarUrl())
                                .id(user.getId())
                                .role(user.getRole().name())
                                .message("Đăng nhập thành công!!!")
                                .state(true)
                                .build(), HttpStatus.OK);
        }

        private void revokeAllUserTokens(User user) {
                var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
                if (validUserTokens.isEmpty())
                        return;
                validUserTokens.forEach(token -> {
                        token.setExpired(true);
                        token.setRevoked(true);
                });
                tokenRepository.saveAll(validUserTokens);
        }

        public void refreshToken(
                        HttpServletRequest request,
                        HttpServletResponse response) throws IOException {
                final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
                final String refreshToken;
                final String userEmail;
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                        return;
                }
                refreshToken = authHeader.substring(7);
                userEmail = jwtService.extractUsername(refreshToken);
                if (userEmail != null) {
                        var user = this.repository.findByEmail(userEmail)
                                        .orElseThrow();
                        if (jwtService.isTokenValid(refreshToken, user)) {
                                var accessToken = jwtService.generateToken(user);
                                revokeAllUserTokens(user);
                                saveUserToken(user, accessToken);
                                var authResponse = AuthenticationResponse.builder()
                                                .accessToken(accessToken)
                                                .refreshToken(refreshToken)
                                                .build();
                                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
                        }
                }
        }

        // private void revokeTokenGoogle(String googleToken) {
        // String url = "https://oauth2.googleapis.com/revoke?token=" + googleToken;
        // RestTemplate restTemplate = new RestTemplate();
        // restTemplate.postForEntity(url, null, String.class);
        // }

        public ResponseEntity<Map<String, Object>> revokeToken(HttpServletRequest request, HttpServletResponse response)
                        throws StreamWriteException, DatabindException, IOException {
                final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
                final String token;
                final String userEmail;
                Map<String, Object> responseMap = new HashMap<>();
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                        responseMap.put("message", "Lỗi người dùng, không thấy token!!!");
                        responseMap.put("state", false);
                        return new ResponseEntity<>(responseMap, HttpStatus.BAD_GATEWAY);
                }
                token = authHeader.substring(7);
                userEmail = jwtService.extractUsername(token);
                if (userEmail != null) {
                        var user = this.repository.findByEmail(userEmail)
                                        .orElseThrow();
                        if (jwtService.isTokenValid(token, user)) {
                                revokeAllUserTokens(user);
                                responseMap.put("message", "Đăng xuất thành công!!!");
                                responseMap.put("state", true);
                                return new ResponseEntity<>(responseMap, HttpStatus.OK);
                        } else {
                                responseMap.put("message", "Lỗi người dùng, không thấy token!!!");
                                responseMap.put("state", true);
                                return new ResponseEntity<>(responseMap, HttpStatus.BAD_GATEWAY);
                        }
                } else {
                        responseMap.put("message", "Lỗi người dùng, không thấy token!!!");
                        responseMap.put("state", true);
                        return new ResponseEntity<>(responseMap, HttpStatus.BAD_GATEWAY);
                }
        }

        public AuthenticationResponse loginGoogle(GuestRequest request, String googleAccessToken) {
                boolean isUserExisted = repository.findByEmail(request.getEmail()).isPresent();
                String message = new String("Login success!!!");
                if (isUserExisted == false) {
                        var userTemp = User.builder()
                                        .email(request.getEmail())
                                        .isDelete(false)
                                        .password(passwordEncoder.encode("123456"))
                                        .avatarUrl("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")
                                        .firstname(request.getFirstname())
                                        .lastname(request.getLastname())
                                        .canResetPassword(false)
                                        .role(Role.USER)
                                        .isVerify(true)
                                        .build();
                        repository.save(userTemp);
                        message = "The default password is `123456` need to change!!!";
                }

                var user = repository.findByEmail(request.getEmail()).orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                var jwtRefreshToken = jwtService.generateRefreshToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, jwtToken);
                return AuthenticationResponse.builder()
                                .accessToken(jwtToken)
                                .refreshToken(jwtRefreshToken)
                                .avatarUrl(user.getAvatarUrl())
                                .googleToken(googleAccessToken)
                                .id(user.getId())
                                .role(user.getRole().name())
                                .message(message)
                                .build();
        }

        public ResponseEntity<Map<String, Object>> verifyAccount(String email, String otp) {
                Map<String, Object> responseMap = new HashMap<>();

                Optional<User> userOptional = repository.findByEmail(email);
                if (userOptional.isPresent()) {
                        User user = userOptional.get();
                        if (user.getOtp().equals(otp)
                                        && Duration.between(user.getOtpGenerateTime(), LocalDateTime.now())
                                                        .getSeconds() < (1 * 300)) {
                                user.setVerify(true);
                                repository.save(user);
                                responseMap.put("message", "OTP đã được xác thực, hãy đăng nhập!!!");
                                responseMap.put("state", true);
                                return ResponseEntity.ok(responseMap);
                        }
                        responseMap.put("message", "Vui lòng tạo OTP lại!!!");
                        responseMap.put("state", false);
                        return ResponseEntity.ok(responseMap);
                }

                // Trả về map mới nếu không tìm thấy người dùng
                responseMap.put("message", "Không tìm thấy người dùng với mail này: " + email);
                responseMap.put("state", false);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }

        public ResponseEntity<Map<String, Object>> verifyPassword(String email, String otp) {
                Map<String, Object> responseMap = new HashMap<>();

                Optional<User> userOptional = repository.findByEmail(email);
                if (userOptional.isPresent()) {
                        User user = userOptional.get();
                        if (user.getOtp().equals(otp)
                                        && Duration.between(user.getOtpGenerateTime(), LocalDateTime.now())
                                                        .getSeconds() < (1 * 300)) {
                                user.setCanResetPassword(true);
                                repository.save(user);
                                responseMap.put("message", "OTP được xác thực, bạn có thể thay đổi mật khẩu!!!");
                                responseMap.put("state", true);
                                return new ResponseEntity<>(responseMap, HttpStatus.OK);
                        }
                        responseMap.put("message", "Vui lòng tạo lại OTP!!!");
                        responseMap.put("state", false);
                        return new ResponseEntity<>(responseMap, HttpStatus.BAD_REQUEST);
                }

                // Trả về map mới nếu không tìm thấy người dùng
                responseMap.put("message", "Không tìm thấy người dùng với email này: " + email);
                responseMap.put("state", false);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }

        public ResponseEntity<Map<String, Object>> regenerateOtp(String email) {
                Map<String, Object> responseMap = new HashMap<>();
                Optional<User> userOptional = repository.findByEmail(email);
                if (userOptional.isPresent()) {
                        User user = userOptional.get();
                        String otp = otpUtil.generateOtp();
                        try {
                                emailUtil.sendOtpEmail(email, otp);
                        } catch (MessagingException e) {
                                responseMap.put("message", "Không thể gửi được OTP!!!");
                                responseMap.put("state", false);
                                return new ResponseEntity<>(responseMap, HttpStatus.BAD_REQUEST);

                        }
                        user.setOtp(otp);
                        user.setOtpGenerateTime(LocalDateTime.now());
                        repository.save(user);
                        responseMap.put("message", "OTP đã được gửi vào mail xin vui lòng nhập!!!");
                        responseMap.put("state", true);
                        return new ResponseEntity<>(responseMap, HttpStatus.OK);
                }
                responseMap.put("message", "Không tìm thấy người dùng với email này: " + email);
                responseMap.put("state", false);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap);
        }

        public ResponseEntity<Map<String, Object>> resetPassword(AuthenticationRequest request) {
                Map<String, Object> responseMap = new HashMap<>();
                var user = repository.findByEmail(request.getEmail()).orElseThrow();
                if (user.isCanResetPassword() == false) {
                        responseMap.put("message", "Không thể đặt lại mật khẩu!!");
                        responseMap.put("state", false);
                        return new ResponseEntity<>(responseMap, HttpStatus.BAD_REQUEST);
                }
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setCanResetPassword(false);
                repository.save(user);
                responseMap.put("message", "Đặt lại mật khẩu thành công!!");
                responseMap.put("state", true);
                return new ResponseEntity<>(responseMap, HttpStatus.OK);
        }
}
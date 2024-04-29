package com.eko.eko.auth;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.eko.eko.config.JwtService;
import com.eko.eko.token.Token;
import com.eko.eko.token.TokenRepository;
import com.eko.eko.token.TokenType;
import com.eko.eko.user.Role;
import com.eko.eko.user.User;
import com.eko.eko.user.UserRepository;
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

        public AuthenticationRespone register(RegisterRequest request) throws JsonProcessingException {
                boolean existedUser = repository.findByEmail(request.getEmail())
                                .isEmpty();
                if (existedUser == false) {
                        return AuthenticationRespone.builder()
                                        .message("User with this email already exists!!!")
                                        .build();
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
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                var jwtRefreshToken = jwtService.generateRefreshToken(user);
                saveUserToken(user, jwtToken);
                return AuthenticationRespone.builder()
                                .accessToken(jwtToken)
                                .refreshToken(jwtRefreshToken)
                                .avatarUrl("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")
                                .role(Role.USER.name())
                                .message("Register success!!!")
                                .id(user.getId())
                                .build();
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

        public AuthenticationRespone authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                if (user.isVerify() == false) {
                        return AuthenticationRespone.builder()
                                        .message("Need to verify!!!")
                                        .build();
                }
                var jwtToken = jwtService.generateToken(user);
                var jwtRefreshToken = jwtService.generateRefreshToken(user);
                System.out.println(user.getId());
                revokeAllUserTokens(user);
                saveUserToken(user, jwtToken);
                return AuthenticationRespone.builder()
                                .accessToken(jwtToken)
                                .refreshToken(jwtRefreshToken)
                                .avatarUrl(user.getAvatarUrl())
                                .id(user.getId())
                                .role(user.getRole().name())
                                .message("Login success!!!")
                                .build();
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
                                var authResponse = AuthenticationRespone.builder()
                                                .accessToken(accessToken)
                                                .refreshToken(refreshToken)
                                                .build();
                                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
                        }
                }
        }

        private void revokeTokenGoogle(String googleToken) {
                String url = "https://oauth2.googleapis.com/revoke?token=" + googleToken;
                RestTemplate restTemplate = new RestTemplate();
                restTemplate.postForEntity(url, null, String.class);
        }

        public void revokeToken(HttpServletRequest request, HttpServletResponse response, String googleToken)
                        throws StreamWriteException, DatabindException, IOException {
                final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
                final String token;
                final String userEmail;
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                        return;
                }
                token = authHeader.substring(7);
                userEmail = jwtService.extractUsername(token);
                if (userEmail != null) {
                        if (!googleToken.isEmpty()) {
                                revokeTokenGoogle(googleToken);
                                request.getSession().invalidate();
                        }
                        var user = this.repository.findByEmail(userEmail)
                                        .orElseThrow();
                        if (jwtService.isTokenValid(token, user)) {
                                revokeAllUserTokens(user);
                                Map<String, String> responeMessage = new HashMap<>();
                                responeMessage.put("message", "token has been revoked!!!");
                                new ObjectMapper().writeValue(response.getOutputStream(), responeMessage);
                        }
                }
        }

        public AuthenticationRespone loginGoogle(GuestRequest request, String googleAccessToken) {
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
                return AuthenticationRespone.builder()
                                .accessToken(jwtToken)
                                .refreshToken(jwtRefreshToken)
                                .avatarUrl(user.getAvatarUrl())
                                .googleToken(googleAccessToken)
                                .id(user.getId())
                                .role(user.getRole().name())
                                .message(message)
                                .build();
        }

        public String verifyAccount(String email, String otp) {
                User user = repository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException(
                                                "User not found with this email: " + email + "!!!"));
                if (user.getOtp().equals(otp) && Duration.between(user.getOtpGenerateTime(),
                                LocalDateTime.now()).getSeconds() < (1 * 300)) {
                        user.setVerify(true);
                        repository.save(user);
                        return "OTP verified you can login!!!";
                }
                return "Please regenerate otp and try again!!!";
        }

        public String verifyPassword(String email, String otp) {
                User user = repository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException(
                                                "User not found with this email: " + email + "!!!"));
                if (user.getOtp().equals(otp) && Duration.between(user.getOtpGenerateTime(),
                                LocalDateTime.now()).getSeconds() < (1 * 300)) {
                        user.setVerify(true);
                        user.setCanResetPassword(true);
                        repository.save(user);
                        return "OTP verified you can reset password!!!";
                }
                return "Please regenerate otp and try again!!!";
        }

        public String regenerateOtp(String email) {
                User user = repository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException(
                                                "User not found with this email: " + email + "!!!"));
                String otp = otpUtil.generateOtp();
                try {
                        emailUtil.sendOtpEmail(email, otp);
                } catch (MessagingException e) {
                        throw new RuntimeException("Unable to send otp please try again!!!");
                }
                user.setOtp(otp);
                user.setOtpGenerateTime(LocalDateTime.now());
                repository.save(user);
                return "Email sent... please verify account within 1 minute!!!";
        }

        public Map<String, String> resetPassword(AuthenticationRequest request) {
                Map<String, String> responseMap = new HashMap<>();
                var user = repository.findByEmail(request.getEmail()).orElseThrow();
                if (user.isCanResetPassword() == false) {
                        responseMap.put("message", "Can't reset password!!");
                        return responseMap;
                }
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                repository.save(user);
                user.setCanResetPassword(false);
                responseMap.put("message", "Reset password success!!");
                return responseMap;
        }

}

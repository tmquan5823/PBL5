package com.eko.eko.auth;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
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
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

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

        public AuthenticationRespone register(RegisterRequest request) throws JsonProcessingException {
                boolean existedUser = repository.findByEmail(request.getEmail())
                                .isEmpty();
                if (existedUser == false) {
                        return AuthenticationRespone.builder()
                                        .message("User with this email already exists")
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
                                .role(Role.USER)
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
                                responeMessage.put("message", "token has been revoked");
                                new ObjectMapper().writeValue(response.getOutputStream(), responeMessage);
                        }
                }
        }

        public AuthenticationRespone loginGoogle(GuestRequest request, String googleAccessToken) {
                boolean isUserExisted = repository.findByEmail(request.getEmail()).isPresent();
                String message = new String();
                if (isUserExisted == false) {
                        var userTemp = User.builder()
                                        .email(request.getEmail())
                                        .isDelete(false)
                                        .password(passwordEncoder.encode("123456"))
                                        .avatarUrl("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")
                                        .firstname(request.getFirstname())
                                        .lastname(request.getLastname())
                                        .role(Role.USER)
                                        .build();
                        repository.save(userTemp);
                        message = "The default password is `123456` need to change";
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
}

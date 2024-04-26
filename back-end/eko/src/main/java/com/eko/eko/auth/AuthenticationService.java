package com.eko.eko.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eko.eko.config.JwtService;
import com.eko.eko.user.Role;
import com.eko.eko.user.User;
import com.eko.eko.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthenticationRespone register(RegisterRequest request) {
                var user = User.builder()
                                .address(request.getAddress())
                                .email(request.getEmail())
                                .isDelete(false)
                                .password(passwordEncoder.encode(request.getPassword()))
                                .telephone(request.getTelephone())
                                .status(false)
                                .firstname(request.getFirstname())
                                .lastname(request.getLastname())
                                .role(Role.USER)
                                .build();
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                // var jwtRefreshToken = jwtService.generateRefreshToken(user);
                return AuthenticationRespone.builder()
                                .token(jwtToken)
                                // .refreshToken(jwtRefreshToken)
                                .build();
        }

        public AuthenticationRespone authenticate(AuthenticationRequest request) {
                System.out.println(request.getEmail());
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                // var jwtRefreshToken = jwtService.generateRefreshToken(user);
                return AuthenticationRespone.builder()
                                .token(jwtToken)
                                // .refreshToken(jwtRefreshToken)
                                .build();
        }
}

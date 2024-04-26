package com.eko.eko.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
                                .isEnabled(request.isEnabled())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .telephone(request.getTelephone())
                                .status(request.isStatus())
                                .firstname(request.getFirstname())
                                .lastname(request.getLastname())
                                .role(Role.USER)
                                .build();
                repository.save(user);
                Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority(String.valueOf(user.getRole())));
                var jwtToken = jwtService.generateToken(user, authorities);
                var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
                return AuthenticationRespone.builder()
                                .token(jwtToken)
                                .refreshToken(jwtRefreshToken)
                                .build();
        }

        // public AuthenticationRespone authenticate(AuthenticationRequest request) {
        // System.out.println(1);
        // authenticationManager.authenticate(
        // new UsernamePasswordAuthenticationToken(
        // request.getEmail(),
        // request.getPassword()));
        // System.out.println(2);
        // var user = repository.findByEmail(request.getEmail())
        // .orElseThrow();
        // var jwtToken = jwtService.generateToken(user);
        // return AuthenticationRespone.builder()
        // .token(jwtToken)
        // .build();
        // }
        public AuthenticationRespone authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority(String.valueOf(user.getRole())));
                var jwtToken = jwtService.generateToken(user, authorities);
                var jwtRefreshToken = jwtService.generateRefreshToken(user, authorities);
                return AuthenticationRespone.builder()
                                .token(jwtToken)
                                .refreshToken(jwtRefreshToken)
                                .build();
        }
}

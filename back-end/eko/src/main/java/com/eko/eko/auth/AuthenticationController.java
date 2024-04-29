package com.eko.eko.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationRespone> register(
            @RequestBody RegisterRequest request) throws JsonProcessingException {

        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationRespone> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        service.refreshToken(request, response);
    }

    @PostMapping("/log-out/{googleToken}")
    public void revokeToken(
            @PathVariable String googleToken,
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        service.revokeToken(request, response, googleToken);
    }

    @PutMapping("/verify-account")
    public ResponseEntity<String> verifyAccount(@RequestParam String email,
            @RequestParam String otp) {
        return new ResponseEntity<>(service.verifyAccount(email, otp), HttpStatus.OK);
    }

    @PutMapping("/verify-password")
    public ResponseEntity<String> verifyPassword(@RequestParam String email,
            @RequestParam String otp) {
        return new ResponseEntity<>(service.verifyPassword(email, otp), HttpStatus.OK);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody AuthenticationRequest request) {
        return new ResponseEntity<>(service.resetPassword(request), HttpStatus.OK);
    }

    @PutMapping("/regenerate-otp")
    public ResponseEntity<String> regenerateOtp(@RequestParam String email) {
        return new ResponseEntity<>(service.regenerateOtp(email), HttpStatus.OK);
    }
}

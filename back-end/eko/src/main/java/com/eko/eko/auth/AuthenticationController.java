package com.eko.eko.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) throws JsonProcessingException {

        return service.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return service.authenticate(request);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        service.refreshToken(request, response);
    }

    @PostMapping("/log-out")
    public ResponseEntity<Map<String, Object>> revokeToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        return service.revokeToken(request, response);
    }

    @PostMapping("/verify-account")
    public ResponseEntity<Map<String, Object>> verifyAccount(@RequestParam String email,
            @RequestParam String otp) {
        return service.verifyAccount(email, otp);
    }

    @PostMapping("/verify-password")
    public ResponseEntity<Map<String, Object>> verifyPassword(@RequestParam String email,
            @RequestParam String otp) {
        return service.verifyPassword(email, otp);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody AuthenticationRequest request) {
        return service.resetPassword(request);
    }

    @PostMapping("/regenerate-otp")
    public ResponseEntity<Map<String, Object>> regenerateOtp(@RequestParam String email) {
        return service.regenerateOtp(email);
    }

}

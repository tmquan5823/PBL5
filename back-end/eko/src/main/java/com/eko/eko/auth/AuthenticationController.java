package com.eko.eko.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD
=======
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
>>>>>>> 4e47077510a589ea52239da60771a33c10c9b3ae
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

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

    // login-google
    // @GetMapping("/logingoogle")
    // public Map<String, Object> currentUser(OAuth2AuthenticationToken
    // oAuth2AuthenticationToken) {
    // return oAuth2AuthenticationToken.getPrincipal().getAttributes();
    // }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        service.refreshToken(request, response);
    }

    @PostMapping("/log-out")
    public void revokeToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        service.revokeToken(request, response);
    }
}

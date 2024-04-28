package com.eko.eko.auth;

import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
=======
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
>>>>>>> Truong
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

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<AuthenticationRespone> authenticate(
            @RequestBody AuthenticationRequest request) {
        System.out.println("request" + request);
        return ResponseEntity.ok(service.authenticate(request));
    }

<<<<<<< HEAD
    // verify-email

    // refresh-verifyj

=======
>>>>>>> Truong
    // login-google
    // @GetMapping("/logingoogle")
    // public Map<String, Object> currentUser(OAuth2AuthenticationToken
    // oAuth2AuthenticationToken) {
    // return oAuth2AuthenticationToken.getPrincipal().getAttributes();
    // }

<<<<<<< HEAD
    @GetMapping("/logingoogle")
    public GuestRequest currentUser(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        GuestRequest guestRequest = toGuest(oAuth2AuthenticationToken.getPrincipal().getAttributes());
        return guestRequest;
    }

    public GuestRequest toGuest(Map<String, Object> map) {
        if (map == null) {
            return null;
        }
        GuestRequest guest = new GuestRequest();
        guest.setEmail((String) map.get("email"));
        guest.setFirstname((String) map.get("given_name"));
        guest.setLastname((String) map.get("family_name"));
        return guest;
    }

=======
>>>>>>> Truong
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

package com.eko.eko.auth;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/google")
@RequiredArgsConstructor
public class LoginGoogleController {

    private final AuthenticationService service;

    @GetMapping("/login")
    public ResponseEntity<AuthenticationRespone> currentUser(OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        GuestRequest guestRequest = toGuest(oAuth2AuthenticationToken.getPrincipal().getAttributes());
        return ResponseEntity.ok(service.loginGoogle(guestRequest));
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

}

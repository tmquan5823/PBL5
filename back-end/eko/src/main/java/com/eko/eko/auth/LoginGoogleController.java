package com.eko.eko.auth;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/google")
@RequiredArgsConstructor
public class LoginGoogleController {

    private final AuthenticationService service;
    private final OAuth2AuthorizedClientService clientService;

    @GetMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginGoogle(HttpServletRequest request,
            OAuth2AuthenticationToken token) {
        GuestRequest guestRequest = toGuest(token.getPrincipal().getAttributes());
        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(token.getAuthorizedClientRegistrationId(),
                token.getName());
        String accessToken = client.getAccessToken().getTokenValue();
        return ResponseEntity.ok(service.loginGoogle(guestRequest, accessToken));
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

    // @GetMapping("/logout/{accessToken}")
    // public ResponseEntity<String> logout(@PathVariable String accessToken,
    // HttpServletRequest request,
    // HttpServletResponse response) {
    // revokeToken(accessToken);
    // request.getSession().invalidate();
    // return ResponseEntity.ok().body("Logged out successfully");
    // }

    // private void revokeTokenGoogle(String googleToken) {
    // String url = "https://oauth2.googleapis.com/revoke?token=" + googleToken;
    // RestTemplate restTemplate = new RestTemplate();
    // restTemplate.postForEntity(url, null, String.class);
    // }

}

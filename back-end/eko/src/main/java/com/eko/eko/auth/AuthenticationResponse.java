package com.eko.eko.auth;

import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("googleToken")
    private String googleToken;
    @JsonProperty("avatar_url")
    private String avatarUrl;
    @JsonProperty("message")
    private String message;
    @JsonProperty("user_id")
    private Integer id;
    @Value("${admin.id}")
    @JsonProperty("admin_id")
    private int admin_id;
    @JsonProperty("role")
    private String role;
    @JsonProperty("state")
    private boolean state;
}

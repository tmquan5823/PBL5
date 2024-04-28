package com.eko.eko.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRespone {
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
}

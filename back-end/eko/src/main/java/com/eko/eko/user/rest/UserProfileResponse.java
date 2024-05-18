package com.eko.eko.user.rest;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    @JsonProperty("first_name")
    private String firstname;
    @JsonProperty("last_name")
    private String lastname;
    @JsonProperty("email")
    private String email;
    @JsonProperty("phone_num")
    private String phoneNum;
    @JsonProperty("address")
    private String address;
    @JsonProperty("avatar_url")
    private String avatar_url;
    @JsonProperty("date_of_birth")
    private String dateOfBirth;
    @JsonProperty("message")
    private String message;
    @JsonProperty("state")
    private boolean state;
}

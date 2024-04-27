package com.eko.eko.user.rest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String telephone;
    private String address;
}

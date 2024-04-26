package com.eko.eko.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private boolean isEnabled;
    private String telephone;
    private String address;
    private boolean status;
}

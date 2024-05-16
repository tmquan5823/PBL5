package com.eko.eko.user.admin.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListUserResponse {
    @JsonProperty("list_user")
    private List<UserTableResponse> users;
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}

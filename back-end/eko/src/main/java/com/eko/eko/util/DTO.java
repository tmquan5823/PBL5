package com.eko.eko.util;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DTO {
    @JsonProperty("state")
    private boolean state;
    @JsonProperty("message")
    private String message;
}

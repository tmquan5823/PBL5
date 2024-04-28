package com.eko.eko.demo;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.auth.GuestRequest;

@RestController
@RequestMapping("/")
public class DemoController {
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello");
    }

    @RequestMapping(value = "/favicon.ico", method = RequestMethod.GET)
    public void favicon() {
        // Không cần phản hồi gì cả hoặc có thể phản hồi một lỗi không tìm thấy (404)
    }
}

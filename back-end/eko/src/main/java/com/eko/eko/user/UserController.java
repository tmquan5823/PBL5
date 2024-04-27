package com.eko.eko.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.config.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    public final UserService service;
    public final JwtService jwtService;

    public boolean isValidUser(String token, Integer id) {

        return false;
    }

    @GetMapping("/{id}")
    public UserProfileRespone getProfile(@PathVariable Integer id, HttpServletRequest request,
            HttpServletResponse response) {
        if (isValidUser(request.getHeader("Authorization"), id) == true)
            return service.getProfileById(id);
        else
            return new UserProfileRespone().builder().build();
    }
}

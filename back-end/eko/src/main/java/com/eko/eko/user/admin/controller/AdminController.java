package com.eko.eko.user.admin.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eko.eko.user.admin.dto.ListUserResponse;
import com.eko.eko.user.admin.service.AdminService;
import com.eko.eko.user.rest.UserProfileResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService service;

    // @GetMapping("/users")
    // public ResponseEntity<ListUserResponse> getListUser(
    // HttpServletRequest request,
    // @RequestParam(defaultValue = "0") int page,
    // @RequestParam(defaultValue = "10") int size,
    // @RequestParam(required = false) String sortField,
    // @RequestParam(defaultValue = "asc") String sortOrder) {
    // return service.getListUser(request, page, size, sortField, sortOrder);
    // }

    @GetMapping("/users")
    public ResponseEntity<ListUserResponse> getListUser(HttpServletRequest request) {
        return service.getListUser(request);
    }

    @PutMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> changeUserStatus(HttpServletRequest request, @PathVariable int userId) {
        return service.changeUserStatus(request, userId);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserProfileResponse> getUserProfile(HttpServletRequest request, @PathVariable int userId) {
        return service.getUserProfile(request, userId);
    }
}

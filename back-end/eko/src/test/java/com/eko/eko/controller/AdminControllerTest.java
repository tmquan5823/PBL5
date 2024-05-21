package com.eko.eko.controller;

import com.eko.eko.user.admin.controller.AdminController;
import com.eko.eko.user.admin.dto.ListUserResponse;
import com.eko.eko.user.admin.service.AdminService;
import com.eko.eko.user.rest.UserProfileResponse;
import com.eko.eko.config.JwtService;
import com.eko.eko.util.FormatDate;

import jakarta.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AdminControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AdminService adminService;

    @InjectMocks
    private AdminController adminController;

    @Mock
    private JwtService jwtService;

    @Mock
    private FormatDate formatDate;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
    }

    @Test
    void testGetListUser() throws Exception {
        ListUserResponse response = ListUserResponse.builder()
                .message("Lấy danh sách người dùng thành công!!!")
                .state(true)
                .build();

        when(adminService.getListUser(any(HttpServletRequest.class))).thenReturn(ResponseEntity.ok(response));

        mockMvc.perform(get("/api/admin/users")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testChangeUserStatus() throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "Sửa trạng thái người dùng thành công!!!");
        responseMap.put("state", true);

        when(adminService.changeUserStatus(any(HttpServletRequest.class), eq(1)))
                .thenReturn(ResponseEntity.ok(responseMap));

        mockMvc.perform(put("/api/admin/user/1")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(responseMap.get("message")))
                .andExpect(jsonPath("$.state").value(responseMap.get("state")));
    }

    @Test
    void testGetUserProfile() throws Exception {
        UserProfileResponse response = UserProfileResponse.builder()
                .message("Lấy hồ sơ người dùng thành công!!")
                .state(true)
                .build();

        when(adminService.getUserProfile(any(HttpServletRequest.class), eq(1))).thenReturn(ResponseEntity.ok(response));

        mockMvc.perform(get("/api/admin/user/1")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }
}

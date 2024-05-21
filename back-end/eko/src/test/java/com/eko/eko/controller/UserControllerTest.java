package com.eko.eko.controller;

import com.eko.eko.user.repository.UserRepository;
import com.eko.eko.user.rest.UserController;
import com.eko.eko.user.rest.UserService;
import com.eko.eko.user.rest.UserProfileResponse;
import com.eko.eko.user.rest.UserRequest;
import com.eko.eko.user.rest.ChangePasswordRequest;
import com.eko.eko.util.CloudinaryService;
import com.eko.eko.config.JwtService;
import com.eko.eko.util.FormatDate;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Mock
    private JwtService jwtService;

    @Mock
    private CloudinaryService cloudinaryService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private FormatDate formatDate;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testGetProfile() throws Exception {
        UserProfileResponse response = UserProfileResponse.builder()
                .message("Get user's profile success!!")
                .state(true)
                .build();

        when(userService.getProfile(any(HttpServletRequest.class))).thenReturn(response);

        mockMvc.perform(get("/api/user")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testUpdateProfile() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setFirstname("John");
        userRequest.setLastname("Doe");
        userRequest.setAddress("123 Main St");
        userRequest.setTelephone("1234567890");
        userRequest.setDateOfBirth("2000-01-01");

        UserProfileResponse response = UserProfileResponse.builder()
                .message("Update user's profile success!!")
                .state(true)
                .build();

        when(userService.updateProfile(any(UserRequest.class), any(HttpServletRequest.class))).thenReturn(response);

        mockMvc.perform(put("/api/user")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(userRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    // @Test
    // void testUpdateAvatar() throws Exception {
    // Map<String, Object> responseMap = new HashMap<>();
    // responseMap.put("message", "Update user's avatar success!!");
    // responseMap.put("state", true);

    // MultipartFile image = null; // Mock your MultipartFile as needed

    // when(userService.updateAvatar(any(MultipartFile.class),
    // any(HttpServletRequest.class)))
    // .thenReturn(ResponseEntity.ok(responseMap));

    // mockMvc.perform(put("/api/user/avatar")
    // .header("Authorization", "Bearer token")
    // .param("image", "image"))
    // .andExpect(status().isOk())
    // .andExpect(jsonPath("$.message").value(responseMap.get("message")))
    // .andExpect(jsonPath("$.state").value(responseMap.get("state")));
    // }

    @Test
    void testDeleteAvatar() throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "Delete user's avatar success!!");
        responseMap.put("state", true);

        when(userService.deleteAvatar(any(HttpServletRequest.class))).thenReturn(ResponseEntity.ok(responseMap));

        mockMvc.perform(delete("/api/user/avatar")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(responseMap.get("message")))
                .andExpect(jsonPath("$.state").value(responseMap.get("state")));
    }

    @Test
    void testChangePassword() throws Exception {
        ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest();
        changePasswordRequest.setCurrentPassword("oldPassword");
        changePasswordRequest.setNewPassword("newPassword");

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("message", "Thay đổi mật khẩu thành công");
        responseMap.put("state", true);

        when(userService.changePassword(any(ChangePasswordRequest.class), any(HttpServletRequest.class)))
                .thenReturn(ResponseEntity.ok(responseMap));

        mockMvc.perform(put("/api/user/password")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(changePasswordRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(responseMap.get("message")))
                .andExpect(jsonPath("$.state").value(responseMap.get("state")));
    }

    private String asJsonString(Object object) {
        try {
            return new ObjectMapper().writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

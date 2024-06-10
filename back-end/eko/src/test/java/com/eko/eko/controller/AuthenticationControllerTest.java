package com.eko.eko.controller;

import com.eko.eko.auth.AuthenticationController;
import com.eko.eko.auth.AuthenticationRequest;
import com.eko.eko.auth.AuthenticationResponse;
import com.eko.eko.auth.AuthenticationService;
import com.eko.eko.auth.RegisterRequest;
import com.eko.eko.user.entity.Role;
import com.eko.eko.user.entity.User;
import com.eko.eko.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class AuthenticationControllerTest {

        private MockMvc mockMvc;

        @Mock
        private AuthenticationService authenticationService;

        @InjectMocks
        private AuthenticationController authenticationController;

        @Mock
        private PasswordEncoder passwordEncoder;

        @Mock
        private UserRepository userRepository;

        @BeforeEach
        void setUp() {
                MockitoAnnotations.openMocks(this);
                mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();
                var user = User.builder()
                                .address("Quang Nam")
                                .email("voviettruong141003@gmail.com")
                                .isDelete(false)
                                .password(passwordEncoder.encode("truongtruong"))
                                .telephone("0857937360")
                                .avatarUrl("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")
                                .firstname("Vo")
                                .lastname("Truong")
                                .canResetPassword(true)
                                .role(Role.USER)
                                .isVerify(true)
                                .build();

                userRepository.save(user);
        }

        @Test
        void testRegister() throws Exception {
                RegisterRequest registerRequest = new RegisterRequest();
                registerRequest.setEmail("vvt14102003@gmail.com");
                registerRequest.setPassword("truongtruong");
                registerRequest.setAddress("Quang Nam");
                registerRequest.setTelephone("0857937360");
                registerRequest.setFirstname("Truong");
                registerRequest.setLastname("Vo");

                AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                                .message("Đăng ký thành công!!!")
                                .build();

                when(authenticationService.register(any(RegisterRequest.class)))
                                .thenReturn(ResponseEntity.ok(authenticationResponse));
                mockMvc.perform(post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(registerRequest)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(authenticationResponse.getMessage()));
        }

        @Test
        void testAuthenticate_WithValidCredentials() throws Exception {
                String email = "voviettruong141003@example.com";
                String password = "truongtruong";

                AuthenticationRequest request = new AuthenticationRequest();
                request.setEmail(email);
                request.setPassword(password);

                AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                                .message("Đăng nhập thành công!!!")
                                .state(true)
                                .build();

                when(authenticationService.authenticate(any(AuthenticationRequest.class)))
                                .thenReturn(ResponseEntity.ok(authenticationResponse));

                mockMvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(authenticationResponse.getMessage()))
                                .andExpect(jsonPath("$.state").value(authenticationResponse.isState()));
        }

        @Test
        void testAuthenticate_WithInvalidCredentials() throws Exception {
                String email = "voviettruong141003@gmail.com";
                String password = "wrongpassword";

                AuthenticationRequest request = new AuthenticationRequest();
                request.setEmail(email);
                request.setPassword(password);

                AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                                .message("Sai mật khẩu hoặc mail!!")
                                .state(false)
                                .build();

                when(authenticationService.authenticate(any(AuthenticationRequest.class)))
                                .thenReturn(ResponseEntity.status(HttpStatus.OK).body(authenticationResponse));

                mockMvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(request)))
                                .andExpect(jsonPath("$.message").value(authenticationResponse.getMessage()))
                                .andExpect(jsonPath("$.state").value(authenticationResponse.isState()));
        }

        private String asJsonString(Object object) {
                try {
                        return new ObjectMapper().writeValueAsString(object);
                } catch (Exception e) {
                        throw new RuntimeException(e);
                }
        }

        @Test
        void testLogout() throws Exception {
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("message", "Đăng xuất thành công!!!");
                responseMap.put("state", true);
                ResponseEntity<Map<String, Object>> responseEntity = ResponseEntity.ok(responseMap);
                when(authenticationService.revokeToken(any(HttpServletRequest.class), any(HttpServletResponse.class)))
                                .thenReturn(responseEntity);

                mockMvc.perform(post("/api/auth/log-out")
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
        }

        @Test
        void testResetPassword() throws Exception {
                AuthenticationRequest request = new AuthenticationRequest();
                request.setEmail("voviettruong141003@example.com");
                request.setPassword("newpassword");

                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("message", "Đặt lại mật khẩu thành công!!");
                responseMap.put("state", true);
                ResponseEntity<Map<String, Object>> responseEntity = ResponseEntity.ok(responseMap);
                when(authenticationService.resetPassword(any(AuthenticationRequest.class)))
                                .thenReturn(responseEntity);

                mockMvc.perform(post("/api/auth/reset-password")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(request)))
                                .andExpect(status().isOk());
        }

}

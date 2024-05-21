package com.eko.eko.controller;

import com.eko.eko.money.controller.WalletController;
import com.eko.eko.money.dto.ListWalletRespone;
import com.eko.eko.money.dto.WalletRequest;
import com.eko.eko.money.dto.WalletResponse;
import com.eko.eko.money.service.WalletService;
import com.eko.eko.config.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class WalletControllerTest {

        private MockMvc mockMvc;

        @Mock
        private WalletService walletService;

        @InjectMocks
        private WalletController walletController;

        @Mock
        private JwtService jwtService;

        @BeforeEach
        void setUp() {
                MockitoAnnotations.openMocks(this);
                mockMvc = MockMvcBuilders.standaloneSetup(walletController).build();
        }

        @Test
        void testGetAllWallets() throws Exception {
                ListWalletRespone response = ListWalletRespone.builder()
                                .state(true)
                                .message("Lấy tất cả ví thành công!!!")
                                .wallets(Collections.emptyList())
                                .build();

                when(walletService.getAllWallets(any(HttpServletRequest.class)))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(get("/api/user/all-wallets")
                                .header("Authorization", "Bearer token"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        @Test
        void testGetWallet() throws Exception {
                WalletResponse response = WalletResponse.builder()
                                .state(true)
                                .message("Lấy ví thành công!!!")
                                .build();

                when(walletService.getWallet(any(HttpServletRequest.class), any(Integer.class)))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(get("/api/user/wallet/1")
                                .header("Authorization", "Bearer token"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        @Test
        void testCreateWallet() throws Exception {
                WalletRequest walletRequest = new WalletRequest();
                walletRequest.setMoneyAtFirst(1000);
                walletRequest.setWalletName("My Wallet");

                WalletResponse response = WalletResponse.builder()
                                .state(true)
                                .message("Tạo ví thành công!!!")
                                .build();

                when(walletService.createWallet(any(HttpServletRequest.class), any(WalletRequest.class)))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(post("/api/user/wallet")
                                .header("Authorization", "Bearer token")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(walletRequest)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        @Test
        void testUpdateWallet() throws Exception {
                WalletRequest walletRequest = new WalletRequest();
                walletRequest.setWalletId(1);
                walletRequest.setMoneyAtFirst(1500);
                walletRequest.setWalletName("Updated Wallet");

                WalletResponse response = WalletResponse.builder()
                                .state(true)
                                .message("Cập nhật ví thành công!!!")
                                .build();

                when(walletService.updateWallet(any(HttpServletRequest.class), any(WalletRequest.class)))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(put("/api/user/wallet")
                                .header("Authorization", "Bearer token")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(walletRequest)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        @Test
        void testDeleteWallet() throws Exception {
                WalletResponse response = WalletResponse.builder()
                                .state(true)
                                .message("Xóa ví thành công!!!")
                                .build();

                when(walletService.deleteWallet(any(HttpServletRequest.class), any(Integer.class)))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(delete("/api/user/wallet/1")
                                .header("Authorization", "Bearer token"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        private String asJsonString(Object object) {
                try {
                        return new ObjectMapper().writeValueAsString(object);
                } catch (Exception e) {
                        throw new RuntimeException(e);
                }
        }
}

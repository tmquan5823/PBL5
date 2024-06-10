package com.eko.eko.controller;

import com.eko.eko.money.controller.TransactionController;
import com.eko.eko.money.dto.*;
import com.eko.eko.money.service.TransactionService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class TransactionControllerTest {

        private MockMvc mockMvc;

        @Mock
        private TransactionService transactionService;

        @InjectMocks
        private TransactionController transactionController;

        @BeforeEach
        void setUp() {
                MockitoAnnotations.openMocks(this);
                mockMvc = MockMvcBuilders.standaloneSetup(transactionController).build();
        }

        @Test
        void testCreateTransaction() throws Exception {
                TransactionRequest transactionRequest = new TransactionRequest();
                transactionRequest.setAmount(100.0f);
                transactionRequest.setNote("Test transaction");
                transactionRequest.setCategoryId(1);
                transactionRequest.setWalletId(1);
                transactionRequest.setDateTransaction("2024-05-19T10:00:00");

                CreateTransactionResponse response = CreateTransactionResponse.builder()
                                .state(true)
                                .message("Tạo giao dịch thành công!!!")
                                .build();

                when(transactionService.createTransaction(any(HttpServletRequest.class), any(TransactionRequest.class)))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(post("/api/user/transaction")
                                .header("Authorization", "Bearer token")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(transactionRequest)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        @Test
        void testUpdateTransaction() throws Exception {
                TransactionRequest transactionRequest = new TransactionRequest();
                transactionRequest.setAmount(100.0f);
                transactionRequest.setNote("Updated transaction");
                transactionRequest.setCategoryId(1);
                transactionRequest.setWalletId(1);
                transactionRequest.setDateTransaction("2024-05-19T10:00:00");

                TransactionResponse response = TransactionResponse.builder()
                                .state(true)
                                .message("Cập nhật giao dịch thành công!!!")
                                .build();

                when(transactionService.updateTransaction(any(HttpServletRequest.class), any(TransactionRequest.class)))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(put("/api/user/transaction")
                                .header("Authorization", "Bearer token")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(asJsonString(transactionRequest)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        @Test
        void testDeleteTransaction() throws Exception {
                TransactionResponse response = TransactionResponse.builder()
                                .state(true)
                                .message("Xóa giao dịch thành công!!!")
                                .build();

                when(transactionService.deleteTransaction(any(HttpServletRequest.class), anyInt()))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(delete("/api/user/transaction/{transactionId}", 1)
                                .header("Authorization", "Bearer token"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        @Test
        void testGetAllTransactionByWalletId() throws Exception {
                ListAllTransactionResponse response = ListAllTransactionResponse.builder()
                                .state(true)
                                .message("Lấy danh sách giao dịch theo ví thành công!!!")
                                .build();

                when(transactionService.getAllTransactionByWalletId(any(HttpServletRequest.class), anyInt()))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(get("/api/user/transactions/{walletId}", 1)
                                .header("Authorization", "Bearer token"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value(response.getMessage()))
                                .andExpect(jsonPath("$.state").value(response.isState()));
        }

        @Test
        void testGetDiagramDataByUserId() throws Exception {
                DiagramDataResponse response = DiagramDataResponse.builder()
                                .state(true)
                                .message("Lấy dữ liệu biểu đồ thành công!!!")
                                .build();

                when(transactionService.getDiagramDataByUserId(any(HttpServletRequest.class)))
                                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

                mockMvc.perform(get("/api/user/transactions")
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

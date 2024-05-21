package com.eko.eko.controller;

import com.eko.eko.money.controller.BudgetController;
import com.eko.eko.money.dto.BudgetRequest;
import com.eko.eko.money.dto.BudgetResponse;
import com.eko.eko.money.dto.ListBudgetResponse;
import com.eko.eko.money.service.BudgetService;
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

class BudgetControllerTest {

    private MockMvc mockMvc;

    @Mock
    private BudgetService budgetService;

    @InjectMocks
    private BudgetController budgetController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(budgetController).build();
    }

    @Test
    void testGetBudgets() throws Exception {
        ListBudgetResponse response = ListBudgetResponse.builder()
                .state(true)
                .message("Lấy danh sách ngân sách thành công!!!")
                .budgets(Collections.emptyList())
                .build();

        when(budgetService.getBudgets(any(HttpServletRequest.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(get("/api/user/budgets")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testCreateBudget() throws Exception {
        BudgetRequest budgetRequest = new BudgetRequest();
        budgetRequest.setBudgetName("Test Budget");
        budgetRequest.setBudgetMoney(1000.0f);
        budgetRequest.setDateStart("2024-05-19T00:00:00");
        budgetRequest.setDateEnd("2024-05-20T00:00:00");

        BudgetResponse response = BudgetResponse.builder()
                .state(true)
                .message("Tạo ngân sách thành công")
                .build();

        when(budgetService.createBudget(any(HttpServletRequest.class), any(BudgetRequest.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(post("/api/user/budget")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(budgetRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testUpdateBudget() throws Exception {
        BudgetRequest budgetRequest = new BudgetRequest();
        budgetRequest.setBudgetId(1);
        budgetRequest.setBudgetName("Updated Budget");
        budgetRequest.setBudgetMoney(1500.0f);
        budgetRequest.setDateStart("2024-05-19T00:00:00");
        budgetRequest.setDateEnd("2024-05-20T00:00:00");

        BudgetResponse response = BudgetResponse.builder()
                .state(true)
                .message("Cập nhật ngân sách thành công!!!")
                .build();

        when(budgetService.updateBudget(any(HttpServletRequest.class), any(BudgetRequest.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(put("/api/user/budget")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(budgetRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testDeleteBudget() throws Exception {
        BudgetResponse response = BudgetResponse.builder()
                .state(true)
                .message("Xóa ngân sách thành công!!!")
                .build();

        when(budgetService.deleteBudget(any(HttpServletRequest.class), any(Integer.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(delete("/api/user/budget/1")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testGetBudget() throws Exception {
        BudgetResponse response = BudgetResponse.builder()
                .state(true)
                .message("Lấy ngân sách thành công!!!")
                .build();

        when(budgetService.getBudget(any(HttpServletRequest.class), any(Integer.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(get("/api/user/budget/1")
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

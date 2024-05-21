package com.eko.eko.controller;

import com.eko.eko.money.controller.CategoryController;
import com.eko.eko.money.dto.CategoryRequest;
import com.eko.eko.money.dto.CategoryResponse;
import com.eko.eko.money.dto.ListCategoriesResponse;
import com.eko.eko.money.service.CategoryService;
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

class CategoryControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();
    }

    @Test
    void testGetAllCategories() throws Exception {
        ListCategoriesResponse response = ListCategoriesResponse.builder()
                .state(true)
                .message("Lấy danh sách danh mục thành công!!!")
                .categories(Collections.emptyList())
                .build();

        when(categoryService.getAllCategories(any(HttpServletRequest.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(get("/api/user/categories")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testCreateCategory() throws Exception {
        CategoryRequest categoryRequest = new CategoryRequest();
        categoryRequest.setContent("Test Category");
        categoryRequest.setIconUrl("http://icon.url");
        categoryRequest.setIconColor("#FFFFFF");
        categoryRequest.setIncome(true);

        CategoryResponse response = CategoryResponse.builder()
                .state(true)
                .message("Tạo danh mục thành công")
                .build();

        when(categoryService.createCategory(any(HttpServletRequest.class), any(CategoryRequest.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(post("/api/user/category")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(categoryRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testUpdateCategory() throws Exception {
        CategoryRequest categoryRequest = new CategoryRequest();
        categoryRequest.setCategoryId(1);
        categoryRequest.setContent("Updated Category");
        categoryRequest.setIconUrl("http://updated.icon.url");
        categoryRequest.setIconColor("#000000");
        categoryRequest.setIncome(false);

        CategoryResponse response = CategoryResponse.builder()
                .state(true)
                .message("Cập nhật danh mục thành công!!!")
                .build();

        when(categoryService.updateCategory(any(HttpServletRequest.class), any(CategoryRequest.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(put("/api/user/category")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(categoryRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testDeleteCategory() throws Exception {
        CategoryResponse response = CategoryResponse.builder()
                .state(true)
                .message("Xóa danh mục thành công!!!")
                .build();

        when(categoryService.deleteCategory(any(HttpServletRequest.class), any(Integer.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(delete("/api/user/category/1")
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(response.getMessage()))
                .andExpect(jsonPath("$.state").value(response.isState()));
    }

    @Test
    void testGetAllCategoriesByWalletId() throws Exception {
        ListCategoriesResponse response = ListCategoriesResponse.builder()
                .state(true)
                .message("Lấy danh sách danh mục theo ví thành công!!!")
                .categories(Collections.emptyList())
                .build();

        when(categoryService.getAllCategoriesByWalletId(any(HttpServletRequest.class), any(Integer.class)))
                .thenReturn(new ResponseEntity<>(response, HttpStatus.OK));

        mockMvc.perform(get("/api/user/categories/1")
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

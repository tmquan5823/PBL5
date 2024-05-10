package com.eko.eko.money.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eko.eko.config.JwtService;
import com.eko.eko.money.dto.CategoryRequest;
import com.eko.eko.money.dto.CategoryResponse;
import com.eko.eko.money.dto.ListCategoriesResponse;
import com.eko.eko.money.entity.Category;
import com.eko.eko.money.repository.CategoryRepository;
import com.eko.eko.money.repository.WalletRepository;
import com.eko.eko.user.User;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final JwtService jwtService;
    private final WalletRepository walletRepository;

    public ResponseEntity<ListCategoriesResponse> getAllCategories(HttpServletRequest request, int walletId) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null) {
                return new ResponseEntity<>(ListCategoriesResponse.builder().state(false)
                        .message("Lỗi người dùng ; token hết hạn!!!").build(), HttpStatus.BAD_REQUEST);
            }
            if (user.getId() != walletRepository.findById(walletId).orElseThrow().getUser().getId()) {
                return new ResponseEntity<>(ListCategoriesResponse.builder().state(false)
                        .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
            } else {
                List<Category> categories = categoryRepository.findAllCategoriesByWalletId(walletId);
                return new ResponseEntity<>(
                        ListCategoriesResponse.builder().message("Lấy danh mục của ví thành công!!!")
                                .state(true).categories(categories).build(),
                        HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(
                    ListCategoriesResponse.builder().message("Lỗi lấy danh sách danh mục tương ứng với ví")
                            .state(false).build(),
                    HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<CategoryResponse> createCategory(HttpServletRequest request,
            CategoryRequest categoryRequest) {
        // try {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        if (user == null) {
            return new ResponseEntity<>(CategoryResponse.builder().state(false)
                    .message("Lỗi người dùng ; token hết hạn!!!").build(), HttpStatus.BAD_REQUEST);
        }
        if (user.getId() != walletRepository.findById(categoryRequest.getWalletId()).orElseThrow().getUser()
                .getId()) {
            return new ResponseEntity<>(CategoryResponse.builder().state(false)
                    .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
        }
        Category category = Category.builder().content(categoryRequest.getContent())
                .iconUrl(categoryRequest.getIconUrl())
                .iconColor(categoryRequest.getIconColor())
                .isIncome(categoryRequest.isIncome())
                .wallet(walletRepository.findById(categoryRequest.getWalletId()).orElseThrow())
                .build();
        categoryRepository.save(category);
        return new ResponseEntity<>(CategoryResponse.builder()
                .categoryId(category.getId())
                .content(category.getContent())
                .iconColor(category.getIconColor())
                .iconUrl(category.getIconUrl())
                .isIncome(category.isIncome())
                .wallet(category.getWallet())
                .state(true)
                .message("Tạo danh mục thành công").build(), HttpStatus.BAD_REQUEST);
        // } catch (Exception e) {
        // return new ResponseEntity<>(
        // CategoryResponse.builder().message("Lỗi lấy danh sách danh mục tương ứng với
        // ví")
        // .state(false).build(),
        // HttpStatus.BAD_REQUEST);
        // }
    }

}

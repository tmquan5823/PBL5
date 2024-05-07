package com.eko.eko.money.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eko.eko.config.JwtService;
import com.eko.eko.money.dto.ListWalletRespone;
import com.eko.eko.money.dto.WalletRequest;
import com.eko.eko.money.dto.WalletResponse;
import com.eko.eko.money.entity.Category;
import com.eko.eko.money.entity.Wallet;
import com.eko.eko.money.repository.CategoryRepository;
import com.eko.eko.money.repository.WalletRepository;
import com.eko.eko.user.User;
import com.eko.eko.user.UserRepository;
import com.eko.eko.util.DefaultCategories;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final CategoryRepository categoryRepository;
    private final JwtService jwtService;
    private final DefaultCategories defaultCategories;

    public ResponseEntity<ListWalletRespone> getAllWallets(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null) {
                return new ResponseEntity<>(ListWalletRespone.builder().state(false)
                        .message("Không tìm thấy người dùng ; token hết hạn!!!").build(), HttpStatus.BAD_GATEWAY);
            } else {
                System.out.println("CHECK");
                System.out.println(user.getEmail());
                List<Wallet> wallets = walletRepository.findAllByUserId(user.getId());
                return new ResponseEntity<>(ListWalletRespone.builder().state(true)
                        .message("Lấy tất cả ví thành công!!!").wallets(wallets).build(), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(ListWalletRespone.builder().state(false)
                    .message("Lỗi tìm tất cả ví!!!").build(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<WalletResponse> createWallet(HttpServletRequest request, WalletRequest walletRequest) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null) {
                return new ResponseEntity<>(WalletResponse.builder().state(false)
                        .message("Không tìm thấy người dùng ; token hết hạn!!!").build(), HttpStatus.BAD_REQUEST);

            } else {
                Wallet wallet = Wallet.builder().moneyAtFirst(walletRequest.getMoneyAtFirst())
                        .moneyLeft(walletRequest.getMoneyAtFirst())
                        .walletName(walletRequest.getWalletName()).user(user).build();
                List<Category> categories = defaultCategories.createListCategoriesDefault(wallet);
                wallet.setCategories(categories);
                walletRepository.save(wallet);
                return new ResponseEntity<>(WalletResponse.builder().state(true).message("Tạo ví thành công!!!")
                        .walletName(wallet.getWalletName()).moneyAtFirst(wallet.getMoneyAtFirst())
                        .categories(wallet.getCategories()).build(), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(WalletResponse.builder().state(false)
                    .message("Lỗi tạo ví !!").build(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<WalletResponse> deleteWallet(HttpServletRequest request, int walletId) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null && user.getId() != walletRepository.findById(walletId).orElseThrow().getId()) {
                return new ResponseEntity<>(WalletResponse.builder().state(false)
                        .message("Lỗi người dùng ; token hết hạn!!!").build(), HttpStatus.BAD_REQUEST);

            } else {
                walletRepository.deleteById(walletId);
                return new ResponseEntity<>(WalletResponse.builder().state(true).message("Xóa ví thành công!!!")
                        .build(), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(WalletResponse.builder().state(false)
                    .message("Lỗi xóa ví !!").build(), HttpStatus.BAD_REQUEST);
        }
    }
}

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
import com.eko.eko.money.repository.WalletRepository;
import com.eko.eko.user.entity.User;
import com.eko.eko.util.DefaultCategories;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;
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
                walletRepository.save(wallet);
                return new ResponseEntity<>(WalletResponse.builder().state(true).message("Tạo ví thành công!!!")
                        .walletId(wallet.getId())
                        .walletName(wallet.getWalletName()).moneyAtFirst(wallet.getMoneyAtFirst())
                        .moneyLeft(wallet.getMoneyLeft())
                        .user(user)
                        .build(), HttpStatus.OK);
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
            if (user == null) {
                return new ResponseEntity<>(WalletResponse.builder().state(false)
                        .message("Lỗi người dùng ; token hết hạn!!!").build(), HttpStatus.BAD_REQUEST);
            }
            if (user.getId() != walletRepository.findById(walletId).orElseThrow().getUser().getId()) {
                return new ResponseEntity<>(WalletResponse.builder().state(false)
                        .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
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

    @SuppressWarnings("null")
    public ResponseEntity<WalletResponse> updateWallet(HttpServletRequest request, WalletRequest walletRequest) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null
                    && user.getId() != walletRepository.findById(walletRequest.getWalletId()).orElseThrow().getId()) {
                return new ResponseEntity<>(WalletResponse.builder().state(false)
                        .message("Không tìm thấy người dùng ; token hết hạn!!!").build(), HttpStatus.BAD_REQUEST);

            } else {
                Wallet wallet = walletRepository.findById(walletRequest.getWalletId()).orElseThrow();
                wallet.setWalletName(walletRequest.getWalletName());
                wallet.setMoneyLeft(wallet.getMoneyLeft() - wallet.getMoneyAtFirst() + walletRequest.getMoneyAtFirst());
                wallet.setMoneyAtFirst(walletRequest.getMoneyAtFirst());
                walletRepository.save(wallet);
                return new ResponseEntity<>(WalletResponse.builder().state(true).message("Cập nhật ví thành công!!!")
                        .walletId(wallet.getId())
                        .walletName(wallet.getWalletName()).moneyAtFirst(wallet.getMoneyAtFirst())
                        .moneyAtFirst(wallet.getMoneyAtFirst())
                        .moneyLeft(wallet.getMoneyLeft())
                        .user(wallet.getUser()).build(), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(WalletResponse.builder().state(false)
                    .message("Lỗi cập nhật ví !!").build(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<WalletResponse> getWallet(HttpServletRequest request, int walletId) {
        try {
            String authHeader = request.getHeader("Authorization");
            User user = jwtService.getUserFromAuthHeader(authHeader);
            if (user == null) {
                return new ResponseEntity<>(WalletResponse.builder().state(false)
                        .message("Không tìm thấy người dùng ; token hết hạn!!!").build(), HttpStatus.BAD_REQUEST);

            }
            if (user.getId() != walletRepository.findById(walletId).orElseThrow().getUser().getId()) {
                return new ResponseEntity<>(WalletResponse.builder().state(false)
                        .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
            } else {
                Wallet wallet = walletRepository.findById(walletId).orElseThrow();
                return new ResponseEntity<>(WalletResponse.builder().state(true).message("Lấy ví thành công!!!")
                        .walletId(wallet.getId())
                        .walletName(wallet.getWalletName()).moneyAtFirst(wallet.getMoneyAtFirst())
                        .moneyLeft(wallet.getMoneyLeft())
                        .user(user).build(), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(WalletResponse.builder().state(false)
                    .message("Lỗi lấy ví !!").build(), HttpStatus.BAD_REQUEST);
        }
    }
}

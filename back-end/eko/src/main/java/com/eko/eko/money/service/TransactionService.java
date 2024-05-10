package com.eko.eko.money.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eko.eko.config.JwtService;
import com.eko.eko.money.dto.ListAllTransactionResponse;
import com.eko.eko.money.dto.TransactionRequest;
import com.eko.eko.money.dto.TransactionResponse;
import com.eko.eko.money.entity.Category;
import com.eko.eko.money.entity.Transaction;
import com.eko.eko.money.repository.CategoryRepository;
import com.eko.eko.money.repository.TransactionRepository;
import com.eko.eko.money.repository.WalletRepository;
import com.eko.eko.user.User;
import com.eko.eko.util.FormatDate;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {
        public final JwtService jwtService;
        public final TransactionRepository transactionRepository;
        public final CategoryRepository categoryRepository;
        public final WalletRepository walletRepository;
        public final FormatDate formatDate;

        public List<Transaction> getAllTransactionByWalletId(int walletId) {
                return transactionRepository.findAllByWalletId(walletId);
        }

        public ResponseEntity<TransactionResponse> createTransaction(HttpServletRequest request,
                        TransactionRequest transactionRequest) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        System.out.println(authHeader);
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.BAD_REQUEST);
                        }
                        if (user.getId() != categoryRepository.findById(transactionRequest.getCategoryId())
                                        .orElseThrow()
                                        .getWallet().getUser().getId()) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
                        }
                        Transaction transaction = Transaction.builder()
                                        .amount(transactionRequest.getAmount())
                                        .note(transactionRequest.getNote())
                                        .category(categoryRepository.findById(transactionRequest.getCategoryId())
                                                        .orElseThrow())
                                        .build();
                        if (!transactionRequest.getDateEndCycle().isEmpty()) {
                                transaction
                                                .setDateEndCycle(formatDate.formatStringToLocalDateTime(
                                                                transactionRequest.getDateEndCycle()));
                        }
                        if (!transactionRequest.getCycle().isEmpty()) {
                                transaction.setCycle(formatDate.convertStringToPeriod(transactionRequest.getCycle()));
                        }
                        transaction.setDateTransaction(
                                        formatDate.formatStringToLocalDateTime(
                                                        transactionRequest.getDateTransaction()));
                        transactionRepository.save(transaction);
                        return new ResponseEntity<>(TransactionResponse.builder().state(true)
                                        .amount(transaction.getAmount())
                                        .transactionId(transaction.getId())
                                        .dateEndCycle(formatDate
                                                        .formatLocalDateTimeToString(transaction.getDateEndCycle()))
                                        .dateTransaction(formatDate
                                                        .formatLocalDateTimeToString(transaction.getDateTransaction()))
                                        .cycle(transaction.getCycle())
                                        .note(transaction.getNote())
                                        .category(categoryRepository.findById(transactionRequest.getCategoryId())
                                                        .orElseThrow())
                                        .message("Tạo giao dịch thành công!!!").build(),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                        .message("Lỗi tạo giao dịch!!!").build(),
                                        HttpStatus.BAD_REQUEST);
                }
        }

        public ResponseEntity<TransactionResponse> updateTransaction(HttpServletRequest request,
                        TransactionRequest transactionRequest) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        System.out.println(authHeader);
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.BAD_REQUEST);
                        }
                        if (user.getId() != transactionRepository.findById(transactionRequest.getTransactionId())
                                        .orElseThrow()
                                        .getCategory().getWallet().getUser().getId()) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
                        }
                        Transaction transaction = transactionRepository.findById(transactionRequest.getTransactionId())
                                        .orElseThrow();
                        int categoryId = transactionRequest.getCategoryId();
                        Category category = categoryRepository.findById(categoryId).orElseThrow();
                        transaction.setCategory(category);
                        if (!transactionRequest.getDateEndCycle().isEmpty()) {
                                transaction
                                                .setDateEndCycle(formatDate.formatStringToLocalDateTime(
                                                                transactionRequest.getDateEndCycle()));
                        }
                        if (!transactionRequest.getCycle().isEmpty()) {
                                transaction.setCycle(formatDate.convertStringToPeriod(transactionRequest.getCycle()));
                        }
                        transaction.setAmount(transactionRequest.getAmount());
                        transaction.setNote(transactionRequest.getNote());
                        transaction.setDateTransaction(
                                        formatDate.formatStringToLocalDateTime(
                                                        transactionRequest.getDateTransaction()));
                        transactionRepository.save(transaction);
                        return new ResponseEntity<>(TransactionResponse.builder().state(true)
                                        .amount(transaction.getAmount())
                                        .transactionId(transaction.getId())
                                        .dateEndCycle(formatDate
                                                        .formatLocalDateTimeToString(transaction.getDateEndCycle()))
                                        .dateTransaction(formatDate
                                                        .formatLocalDateTimeToString(transaction.getDateTransaction()))
                                        .cycle(transaction.getCycle())
                                        .note(transaction.getNote())
                                        .category(transaction.getCategory())
                                        .message("Cập nhật giao dịch thành công!!!").build(),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                        .message("Lỗi cập nhật giao dịch!!!").build(),
                                        HttpStatus.BAD_REQUEST);
                }
        }

        public ResponseEntity<TransactionResponse> deleteTransaction(HttpServletRequest request, int transactionId) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        System.out.println(authHeader);
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.BAD_REQUEST);
                        }
                        if (user.getId() != transactionRepository.findById(transactionId).orElseThrow()
                                        .getCategory().getWallet().getUser().getId()) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
                        }
                        Transaction transaction = transactionRepository.findById(transactionId)
                                        .orElseThrow();
                        transactionRepository.delete(transaction);
                        return new ResponseEntity<>(TransactionResponse.builder().state(true)
                                        .message("Xóa giao dịch thành công!!!").build(),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                        .message("Lỗi xóa giao dịch!!!").build(),
                                        HttpStatus.BAD_REQUEST);
                }
        }

        public ResponseEntity<ListAllTransactionResponse> getAllTransactionByWalletId(
                        HttpServletRequest request,
                        int walletId) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        System.out.println(authHeader);
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(ListAllTransactionResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.BAD_REQUEST);
                        }
                        if (user.getId() != walletRepository.findById(walletId).orElseThrow().getUser().getId()) {
                                return new ResponseEntity<>(ListAllTransactionResponse.builder().state(false)
                                                .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
                        }
                        List<Transaction> transactions = this.getAllTransactionByWalletId(walletId);
                        List<Transaction> listFuture = new ArrayList<>();
                        List<Transaction> listPresent = new ArrayList<>();
                        LocalDateTime now = LocalDateTime.now();
                        for (Transaction transaction : transactions) {
                                System.out.println(transaction.getDateTransaction());
                                if (transaction.getDateTransaction().isAfter(now)) {
                                        listFuture.add(transaction);
                                } else {
                                        listPresent.add(transaction);
                                }
                        }
                        return new ResponseEntity<>(ListAllTransactionResponse.builder().state(true)
                                        .message("Lấy danh sách giao dịch theo ví thành công!!!")
                                        .listTransactionFuture(listFuture)
                                        .listTransactionPresent(listPresent)
                                        .build(), HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(ListAllTransactionResponse.builder().state(false)
                                        .message("Lỗi xóa giao dịch!!!").build(),
                                        HttpStatus.BAD_REQUEST);
                }
        }
}

package com.eko.eko.money.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.eko.eko.config.JwtService;
import com.eko.eko.money.dto.CreateTransactionResponse;
import com.eko.eko.money.dto.DiagramDataResponse;
import com.eko.eko.money.dto.ListAllTransactionResponse;
import com.eko.eko.money.dto.ListCategoriesResponse.CategoryWithTransactionTimes;
import com.eko.eko.money.model.Category;
import com.eko.eko.money.model.Transaction;
import com.eko.eko.money.model.Wallet;
import com.eko.eko.money.dto.TransactionRequest;
import com.eko.eko.money.dto.TransactionResponse;
import com.eko.eko.money.dto.DiagramDataResponse.DataDiagram;
import com.eko.eko.money.repository.CategoryRepository;
import com.eko.eko.money.repository.TransactionRepository;
import com.eko.eko.money.repository.WalletRepository;
import com.eko.eko.user.entity.User;
import com.eko.eko.user.repository.UserRepository;
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
        public final UserRepository userRepository;
        public final FormatDate formatDate;

        @Scheduled(cron = "0 1 0 * * *")
        public void reloadTransactionDaily() {
                System.out.println("CHECK SHCHEDULE");
                List<Transaction> transactions = transactionRepository.findAllVerifyTransaction();
                for (Transaction transaction : transactions) {
                        if (transaction.getCycle() == null)
                                continue;
                        if (!(transaction.getDateTransaction().plus(transaction.getCycle()))
                                        .isAfter(transaction.getDateEndCycle())) {
                                Transaction temp = Transaction.builder()
                                                .amount(transaction.getAmount())
                                                .note(transaction.getNote())
                                                .dateTransaction(transaction.getDateTransaction()
                                                                .plus(transaction.getCycle()))
                                                .dateEndCycle(transaction.getDateEndCycle())
                                                .cycle(transaction.getCycle())
                                                .wallet(transaction.getWallet())
                                                .category(transaction.getCategory())
                                                .build();
                                transactionRepository.save(temp);
                                Wallet wallet = walletRepository.findById(transaction.getWallet().getId())
                                                .orElseThrow();
                                wallet.setMoneyLeft(reloadWalletMoneyLeft(wallet.getId()) + wallet.getMoneyAtFirst());
                                walletRepository.save(wallet);
                        }
                }
        }

        public List<Transaction> getAllTransactionByWalletId(int walletId) {
                return transactionRepository.findAllByWalletId(walletId);
        }

        public float reloadWalletMoneyLeft(int walletId) {
                List<Transaction> transactions = this.getAllTransactionByWalletId(walletId);
                float spend = 0;
                for (Transaction transaction : transactions) {
                        spend += transaction.getAmount();
                }
                return spend;
        }

        public ResponseEntity<CreateTransactionResponse> createTransaction(HttpServletRequest request,
                        TransactionRequest transactionRequest) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(CreateTransactionResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.BAD_REQUEST);
                        }
                        if (user.getId() != walletRepository.findById(transactionRequest.getWalletId()).orElseThrow()
                                        .getUser().getId()) {
                                return new ResponseEntity<>(CreateTransactionResponse.builder().state(false)
                                                .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
                        }

                        Wallet wallet = walletRepository.findById(transactionRequest.getWalletId()).orElseThrow();
                        CreateTransactionResponse response = CreateTransactionResponse.builder().state(true)
                                        .wallet(wallet)
                                        .message("Tạo giao dịch thành công!!!").build();
                        List<Transaction> transactions = new ArrayList<>();
                        Transaction transaction = Transaction.builder()
                                        .amount(transactionRequest.getAmount())
                                        .note(transactionRequest.getNote())
                                        .category(categoryRepository.findById(transactionRequest.getCategoryId())
                                                        .orElseThrow())
                                        .build();
                        if (transactionRequest.getDateEndCycle() != null) {
                                transaction
                                                .setDateEndCycle(formatDate.formatStringToLocalDateTime(
                                                                transactionRequest.getDateEndCycle()));
                        }
                        if (transactionRequest.getCycle() != null) {
                                transaction.setCycle(formatDate.convertStringToPeriod(transactionRequest.getCycle()));
                        }
                        transaction.setDateTransaction(
                                        formatDate.formatStringToLocalDateTime(
                                                        transactionRequest.getDateTransaction()));
                        transaction.setWallet(wallet);
                        transactions.add(transaction);
                        LocalDateTime now = LocalDateTime.now();
                        if (!transaction.getDateTransaction().isAfter(now) && transaction.getCycle() != null) {

                                Duration duration1 = Duration.between(transaction.getDateTransaction(), now);
                                Duration duration2 = Duration.between(transaction.getDateTransaction(),
                                                transaction.getDateEndCycle());
                                Duration duration;
                                if (duration1.toDays() > duration2.toDays()) {
                                        duration = duration2;
                                } else {
                                        duration = duration1;
                                }
                                long days = duration.toDays();
                                long numOfLoop = days / (transaction.getCycle().getMonths() * 30
                                                + transaction.getCycle().getDays());
                                LocalDateTime checkDate = transaction.getDateTransaction();
                                // ham them ngay tu qua khu den hien tai
                                for (int i = 1; i <= numOfLoop; i++) {
                                        checkDate = checkDate.plus(transaction.getCycle());
                                        Transaction temp = Transaction.builder()
                                                        .amount(transaction.getAmount())
                                                        .note(transaction.getNote())
                                                        .category(transaction.getCategory())
                                                        .dateEndCycle(transaction.getDateEndCycle())
                                                        .cycle(transaction.getCycle())
                                                        .wallet(wallet)
                                                        .build();
                                        LocalDateTime tempDate = transaction.getDateTransaction();
                                        for (int j = 0; j < i; j++) {
                                                tempDate = tempDate.plus(transaction.getCycle());
                                        }
                                        temp.setDateTransaction(tempDate);
                                        transactions.add(temp);
                                        transactionRepository.save(temp);
                                }
                                if (!transaction.getDateEndCycle().isBefore(now) && !checkDate
                                                .plus(transaction.getCycle()).isAfter(transaction.getDateEndCycle())) {
                                        Transaction futureTransaction = Transaction.builder()
                                                        .amount(transaction.getAmount())
                                                        .note(transaction.getNote())
                                                        .category(transaction.getCategory())
                                                        .dateEndCycle(transaction.getDateEndCycle())
                                                        .cycle(transaction.getCycle())
                                                        .wallet(wallet)
                                                        .dateTransaction(checkDate.plus(transaction.getCycle()))
                                                        .build();
                                        transactionRepository.save(futureTransaction);
                                        response.setTransactionFuture(futureTransaction);
                                }
                                // xet xem co tuong lai hay khong, neu co thi them tuong lai

                        }
                        response.setListTransactionPresent(transactions);
                        wallet.setMoneyLeft(this.reloadWalletMoneyLeft(wallet.getId()) + wallet.getMoneyAtFirst());
                        walletRepository.save(wallet);
                        transactionRepository.save(transaction);

                        return new ResponseEntity<>(response, HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(CreateTransactionResponse.builder().state(false)
                                        .message("Lỗi tạo giao dịch!!!").build(),
                                        HttpStatus.BAD_REQUEST);
                }
        }

        public ResponseEntity<TransactionResponse> updateTransaction(HttpServletRequest request,
                        TransactionRequest transactionRequest) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.BAD_REQUEST);
                        }
                        if (user.getId() != transactionRepository.findById(transactionRequest.getTransactionId())
                                        .orElseThrow()
                                        .getWallet().getUser().getId()) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
                        }
                        Transaction transaction = transactionRepository.findById(transactionRequest.getTransactionId())
                                        .orElseThrow();
                        int categoryId = transactionRequest.getCategoryId();
                        Category category = categoryRepository.findById(categoryId).orElseThrow();
                        transaction.setCategory(category);
                        if (transactionRequest.getDateEndCycle() != null) {
                                transaction.setDateEndCycle(formatDate.formatStringToLocalDateTime(
                                                transactionRequest.getDateEndCycle()));
                        }
                        if (transactionRequest.getCycle() != null) {
                                transaction.setCycle(formatDate.convertStringToPeriod(transactionRequest.getCycle()));
                        }
                        transaction.setAmount(transactionRequest.getAmount());
                        transaction.setNote(transactionRequest.getNote());
                        transaction.setDateTransaction(
                                        formatDate.formatStringToLocalDateTime(
                                                        transactionRequest.getDateTransaction()));
                        Wallet wallet = walletRepository.findById(transaction.getWallet().getId()).orElseThrow();
                        wallet.setMoneyLeft(this.reloadWalletMoneyLeft(wallet.getId()) + wallet.getMoneyAtFirst());
                        transaction.setWallet(wallet);
                        walletRepository.save(wallet);
                        transactionRepository.save(transaction);
                        return new ResponseEntity<>(TransactionResponse.builder().state(true)
                                        .transaction(transaction)
                                        .wallet(transaction.getWallet())
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
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.BAD_REQUEST);
                        }
                        if (user.getId() != transactionRepository.findById(transactionId).orElseThrow()
                                        .getCategory().getUser().getId()) {
                                return new ResponseEntity<>(TransactionResponse.builder().state(false)
                                                .message("Lỗi bảo mật").build(), HttpStatus.BAD_REQUEST);
                        }
                        Transaction transaction = transactionRepository.findById(transactionId)
                                        .orElseThrow();
                        transactionRepository.delete(transaction);
                        Wallet wallet = walletRepository.findById(transaction.getWallet().getId()).orElseThrow();
                        wallet.setMoneyLeft(this.reloadWalletMoneyLeft(wallet.getId()) + wallet.getMoneyAtFirst());
                        transaction.setWallet(wallet);
                        walletRepository.save(wallet);
                        return new ResponseEntity<>(TransactionResponse.builder().state(true)
                                        .wallet(wallet)
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
                        LocalDate now = LocalDate.now();
                        for (Transaction transaction : transactions) {
                                if (transaction.getDateTransaction().toLocalDate().isAfter(now)) {
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
                                        .message("Lỗi lấy danh sách giao dịch theo ví!!!").build(),
                                        HttpStatus.BAD_REQUEST);
                }
        }

        public ResponseEntity<DiagramDataResponse> getDiagramDataByUserId(HttpServletRequest request) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(DiagramDataResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.BAD_REQUEST);
                        }
                        List<Transaction> transactions = transactionRepository.findTransactionsByUserId(user.getId());
                        List<Category> categories = categoryRepository.findAllByUserId(user.getId());
                        List<CategoryWithTransactionTimes> transactionTimes = new ArrayList<>();
                        List<DataDiagram> dataDiagrams = new ArrayList<>();
                        for (Transaction transaction : transactions) {
                                DataDiagram temp = new DataDiagram(transaction);
                                dataDiagrams.add(temp);
                        }
                        for (Category category : categories) {
                                List<Transaction> transactions1 = transactionRepository
                                                .findAllByCategoryId(category.getId());
                                if (transactions1.size() == 0)
                                        continue;
                                transactionTimes.add(CategoryWithTransactionTimes.builder().category(category)
                                                .transactionTime(transactions1.size()).build());
                        }
                        List<Wallet> wallets = walletRepository.findAllByUserId(user.getId());
                        return new ResponseEntity<>(DiagramDataResponse.builder().state(true)
                                        .wallets(wallets)
                                        .categories(transactionTimes)
                                        .dataDiagrams(dataDiagrams)
                                        .message("Lấy dữ liệu biểu đồ thành công!!!")
                                        .build(), HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(DiagramDataResponse.builder().state(false)
                                        .message("Lỗi lấy dữ liệu biểu đồ!!!").build(),
                                        HttpStatus.BAD_REQUEST);
                }
        }
}

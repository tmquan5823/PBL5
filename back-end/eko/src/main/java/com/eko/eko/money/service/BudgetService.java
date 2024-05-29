package com.eko.eko.money.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eko.eko.config.JwtService;
import com.eko.eko.money.dto.BudgetRequest;
import com.eko.eko.money.dto.BudgetResponse;
import com.eko.eko.money.dto.DiagramDataResponse;
import com.eko.eko.money.dto.ListBudgetResponse;
import com.eko.eko.money.dto.ListCategoriesResponse.CategoryWithTransactionTimes;
import com.eko.eko.money.dto.DiagramDataResponse.DataDiagram;
import com.eko.eko.money.model.Budget;
import com.eko.eko.money.model.Category;
import com.eko.eko.money.model.Transaction;
import com.eko.eko.money.repository.BudgetRepository;
import com.eko.eko.money.repository.TransactionRepository;
import com.eko.eko.user.entity.User;
import com.eko.eko.util.FormatDate;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BudgetService {
        private final BudgetRepository budgetRepository;
        private final TransactionRepository transactionRepository;
        private final JwtService jwtService;
        private final FormatDate formatDate;

        public float reloadBudgetSpend(LocalDateTime dateStart, LocalDateTime dateEnd, int userId) {
                List<Transaction> transactions = transactionRepository.findAllBetweenDates(dateStart, dateEnd, userId);
                float spend = 0;
                for (Transaction transaction : transactions) {
                        if (transaction.getCategory().isIncome() == false) {
                                spend += transaction.getAmount();
                        }
                }
                return spend;
        }

        public ResponseEntity<BudgetResponse> createBudget(HttpServletRequest request, BudgetRequest budgetRequest) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(BudgetResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.OK);
                        }
                        Budget budget = Budget.builder()
                                        .name(budgetRequest.getBudgetName())
                                        .money(budgetRequest.getBudgetMoney())
                                        .dateStart(formatDate.formatStringToLocalDateTime(budgetRequest.getDateStart()))
                                        .dateEnd(formatDate.formatStringToLocalDateTime(budgetRequest.getDateEnd()))
                                        .user(user)
                                        .spend(0)
                                        .build();
                        budget.setSpend(
                                        this.reloadBudgetSpend(budget.getDateStart(), budget.getDateEnd(),
                                                        budget.getUser().getId()));
                        budgetRepository.save(budget);
                        return new ResponseEntity<>(
                                        BudgetResponse.builder().budgetId(budget.getId()).budgetMoney(budget.getMoney())
                                                        .budgetSpend(budget.getSpend())
                                                        .budgetName(budget.getName())
                                                        .dateStart(budget.getDateStart())
                                                        .dateEnd(budget.getDateEnd())
                                                        .user(budget.getUser())
                                                        .state(true)
                                                        .message("Tạo ngân sách thành công!!!")
                                                        .build(),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(
                                        BudgetResponse.builder()
                                                        .message("Lỗi tạo ngân sách!!")
                                                        .state(false).build(),
                                        HttpStatus.OK);
                }
        }

        public ResponseEntity<ListBudgetResponse> getBudgets(HttpServletRequest request) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(ListBudgetResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.OK);
                        }
                        List<Budget> budgets = budgetRepository.findAllByUserId(user.getId());
                        for (Budget budget : budgets) {
                                budget.setSpend(
                                                this.reloadBudgetSpend(budget.getDateStart(), budget.getDateEnd(),
                                                                budget.getUser().getId()));
                                budgetRepository.save(budget);
                        }
                        return new ResponseEntity<>(ListBudgetResponse.builder().budgets(budgets).state(true)
                                        .message("Lấy danh sách ngân sách thành công!!!").build(), HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(
                                        ListBudgetResponse.builder()
                                                        .message("Lỗi lấy danh sách ngân sách!!")
                                                        .state(false).build(),
                                        HttpStatus.OK);
                }
        }

        public ResponseEntity<BudgetResponse> updateBudget(HttpServletRequest request, BudgetRequest budgetRequest) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(BudgetResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.OK);
                        }
                        if (user.getId() != budgetRepository.findById(budgetRequest.getBudgetId()).orElseThrow()
                                        .getUser().getId()) {
                                return new ResponseEntity<>(BudgetResponse.builder().state(false)
                                                .message("Lỗi bảo mật!!!").build(), HttpStatus.OK);
                        }
                        Budget budget = budgetRepository.findById(budgetRequest.getBudgetId()).orElseThrow();
                        budget.setName(budgetRequest.getBudgetName());
                        budget.setMoney(budgetRequest.getBudgetMoney());
                        budget.setDateStart(formatDate.formatStringToLocalDateTime(budgetRequest.getDateStart()));
                        budget.setDateEnd(formatDate.formatStringToLocalDateTime(budgetRequest.getDateEnd()));
                        budget.setSpend(
                                        this.reloadBudgetSpend(budget.getDateStart(), budget.getDateEnd(),
                                                        budget.getUser().getId()));
                        budgetRepository.save(budget);
                        return new ResponseEntity<>(
                                        BudgetResponse.builder().budgetId(budget.getId()).budgetMoney(budget.getMoney())
                                                        .budgetSpend(budget.getSpend())
                                                        .budgetName(budget.getName())
                                                        .dateStart(budget.getDateStart())
                                                        .dateEnd(budget.getDateEnd())
                                                        .user(budget.getUser())
                                                        .state(true)
                                                        .message("Cập nhật ngân sách thành công!!!")
                                                        .build(),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(
                                        BudgetResponse.builder()
                                                        .message("Lỗi cập nhật ngân sách!!!")
                                                        .state(false).build(),
                                        HttpStatus.OK);
                }
        }

        public ResponseEntity<BudgetResponse> deleteBudget(HttpServletRequest request, int budgetId) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(BudgetResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.OK);
                        }
                        if (user.getId() != budgetRepository.findById(budgetId).orElseThrow()
                                        .getUser().getId()) {
                                return new ResponseEntity<>(BudgetResponse.builder().state(false)
                                                .message("Lỗi bảo mật!!!").build(), HttpStatus.OK);
                        }
                        Budget budget = budgetRepository.findById(budgetId).orElseThrow();
                        budgetRepository.delete(budget);
                        return new ResponseEntity<>(
                                        BudgetResponse.builder()
                                                        .state(true)
                                                        .message("Xóa ngân sách thành công!!!")
                                                        .build(),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(
                                        BudgetResponse.builder()
                                                        .message("Lỗi Xóa ngân sách!!!")
                                                        .state(false).build(),
                                        HttpStatus.OK);
                }
        }

        public ResponseEntity<BudgetResponse> getBudget(HttpServletRequest request, int budgetId) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(BudgetResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.OK);
                        }
                        if (user.getId() != budgetRepository.findById(budgetId).orElseThrow()
                                        .getUser().getId()) {
                                return new ResponseEntity<>(BudgetResponse.builder().state(false)
                                                .message("Lỗi bảo mật!!!").build(), HttpStatus.OK);
                        }
                        Budget budget = budgetRepository.findById(budgetId).orElseThrow();
                        budget.setSpend(reloadBudgetSpend(budget.getDateStart(), budget.getDateEnd(),
                                        budget.getUser().getId()));
                        return new ResponseEntity<>(
                                        BudgetResponse.builder()
                                                        .state(true)
                                                        .message("Lấy ngân sách thành công!!!")
                                                        .budgetId(budget.getId())
                                                        .budgetName(budget.getName())
                                                        .budgetSpend(budget.getSpend())
                                                        .budgetMoney(budget.getMoney())
                                                        .dateEnd(budget.getDateEnd())
                                                        .dateStart(budget.getDateStart())
                                                        .user(budget.getUser())
                                                        .build(),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(
                                        BudgetResponse.builder()
                                                        .message("Lỗi lấy ngân sách!!!")
                                                        .state(false).build(),
                                        HttpStatus.OK);
                }
        }

        public ResponseEntity<DiagramDataResponse> getAllTransactionByBudgetId(HttpServletRequest request,
                        int budgetId) {
                try {
                        String authHeader = request.getHeader("Authorization");
                        User user = jwtService.getUserFromAuthHeader(authHeader);
                        if (user == null) {
                                return new ResponseEntity<>(DiagramDataResponse.builder().state(false)
                                                .message("Lỗi người dùng ; token hết hạn!!!").build(),
                                                HttpStatus.OK);
                        }
                        Budget budget = budgetRepository.findById(budgetId).orElseThrow();
                        List<Transaction> transactions = transactionRepository
                                        .findAllBetweenDates(budget.getDateStart(), budget.getDateEnd(), user.getId());
                        List<DataDiagram> dataDiagrams = new ArrayList<>();
                        for (Transaction transaction : transactions) {
                                if (transaction.getCategory().isIncome() == true) {
                                        continue;
                                }
                                DataDiagram temp = new DataDiagram(transaction);
                                dataDiagrams.add(temp);
                        }
                        Set<Category> uniqueCategories = new HashSet<>();
                        for (Transaction transaction : transactions) {
                                uniqueCategories.add(transaction.getCategory());
                        }
                        List<CategoryWithTransactionTimes> transactionTimes = new ArrayList<>();
                        List<Category> categories = new ArrayList<>(uniqueCategories);
                        for (Category category : categories) {
                                List<Transaction> transactions1 = transactionRepository
                                                .findAllByCategoryId(category.getId());
                                if (transactions1.size() == 0)
                                        continue;
                                transactionTimes.add(CategoryWithTransactionTimes.builder().category(category)
                                                .transactionTime(transactions1.size()).build());
                        }
                        return new ResponseEntity<>(
                                        DiagramDataResponse.builder().dataDiagrams(dataDiagrams)
                                                        .categories(transactionTimes)
                                                        .state(true)
                                                        .message("Lấy dữ liệu biểu đồ thành công!!!").build(),
                                        HttpStatus.OK);
                } catch (Exception e) {
                        return new ResponseEntity<>(
                                        DiagramDataResponse.builder()
                                                        .message("Lỗi lấy dữ liệu biểu đồ!!")
                                                        .state(false).build(),
                                        HttpStatus.OK);
                }
        }
}

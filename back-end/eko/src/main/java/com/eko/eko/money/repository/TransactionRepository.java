package com.eko.eko.money.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eko.eko.money.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    // List<Transaction> findAllByUserId(@Param("userId") int userId);

    @Query("SELECT t FROM Transaction t WHERE t.wallet.id = :walletId")
    List<Transaction> findAllByWalletId(@Param("walletId") int walletId);

    @Query("SELECT t FROM Transaction t WHERE t.category.id = :categoryId")
    List<Transaction> findAllByCategoryId(@Param("categoryId") int categoryId);

    @Query("SELECT t FROM Transaction t WHERE DATE(t.dateTransaction) = CURRENT_DATE AND t.cycle IS NOT NULL")
    List<Transaction> findAllVerifyTransaction();

    @Query("SELECT t FROM Transaction t " +
            "JOIN t.wallet w " +
            "JOIN w.user u " +
            "WHERE t.dateTransaction BETWEEN :dateStart AND :dateEnd " +
            "AND u.id = :userId")
    List<Transaction> findAllBetweenDates(LocalDateTime dateStart, LocalDateTime dateEnd, int userId);

    // List<Transaction> findAllByCategoryId(@Param("categoryId") int categoryId);

    // List<Transaction> findAllByUserIdNow(@Param("userId") int userId);

    // List<Transaction> findAllByWalletIdNow(@Param("walletId") int walletId);

    // List<Transaction> findAllByCategoryIdNow(@Param("categoryId") int
    // categoryId);

    // List<Transaction> findAllByUserIdFuture(@Param("userId") int userId);

    // List<Transaction> findAllByWalletIdFuture(@Param("walletId") int walletId);

    // List<Transaction> findAllByCategoryIdFuture(@Param("categoryId") int
    // categoryId);
}

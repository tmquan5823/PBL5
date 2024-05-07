package com.eko.eko.money.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eko.eko.money.entity.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    @Query("SELECT w FROM Wallet w JOIN FETCH w.user u WHERE u.id = :userId")
    List<Wallet> findAllByUserId(@Param("userId") int userId);
}

package com.eko.eko.money.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eko.eko.money.entity.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {

}

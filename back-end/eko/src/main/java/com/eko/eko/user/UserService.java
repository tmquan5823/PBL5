package com.eko.eko.user;

import org.springframework.stereotype.Service;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public UserProfileRespone getProfileById(Integer id) {
        var user = repository.findById(id).orElseThrow();
        return new UserProfileRespone().builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .phoneNum(user.getTelephone())
                .address(user.getAddress())
                .email(user.getEmail())
                .build();
    }

}

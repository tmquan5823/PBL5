package com.eko.eko.user.rest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.eko.eko.cloudinary.CloudinaryService;
import com.eko.eko.config.JwtService;
import com.eko.eko.user.User;
import com.eko.eko.user.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final JwtService jwtService;
    private final CloudinaryService cloudinaryService;
    private final PasswordEncoder passwordEncoder;

    public UserProfileResponse getProfile(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        if (user == null) {
            return UserProfileResponse.builder()
                    .message("Can't find user or token is expired!!")
                    .state(false)
                    .build();
        } else {
            return UserProfileResponse.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .phoneNum(user.getTelephone())
                    .address(user.getAddress())
                    .email(user.getEmail())
                    .avatar_url(user.getAvatarUrl())
                    .dateOfBirth(user.getDateOfBirth())
                    .message("Get user's profile success!!")
                    .state(true)
                    .build();
        }

    }

    public UserProfileResponse updateProfile(UserRequest requestUser, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        if (user == null) {
            return UserProfileResponse.builder()
                    .message("Can't find user or token is expired!!")
                    .state(false)
                    .build();
        } else {
            user.setAddress(requestUser.getAddress());
            user.setFirstname(requestUser.getFirstname());
            user.setLastname(requestUser.getLastname());
            user.setTelephone(requestUser.getTelephone());
            repository.save(user);
            return UserProfileResponse.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .phoneNum(user.getTelephone())
                    .address(user.getAddress())
                    .email(user.getEmail())
                    .avatar_url(user.getAvatarUrl())
                    .dateOfBirth(user.getDateOfBirth())
                    .message("Update user's profile success!!")
                    .state(true)
                    .build();
        }
    }

    public ResponseEntity<Map<String, String>> changePassword(ChangePasswordRequest requestUser,
            HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        Map<String, String> responseMap = new HashMap<>();
        if (user == null) {
            responseMap.put("message", "Can't find user or token is expired!!");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            boolean isCorrect = passwordEncoder.matches(requestUser.getCurrentPassword(), user.getPassword());
            if (isCorrect == false) {
                responseMap.put("message", "The current password is not correct!!");
                return new ResponseEntity<>(responseMap, HttpStatus.OK);
            } else {
                user.setPassword(passwordEncoder.encode(requestUser.getNewPassword()));
                repository.save(user);
                responseMap.put("message", "Change password success!!");
                return new ResponseEntity<>(responseMap, HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<Map<String, String>> deleteAvatar(HttpServletRequest request) throws IOException {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        Map<String, String> responseMap = new HashMap<>();
        if (user == null) {
            responseMap.put("message", "Can't find user or token is expired!!");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            if (user.getAvatarUrl()
                    .equals("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")) {
                responseMap.put("message", "Delete user's avatar succes!!");
                return new ResponseEntity<>(responseMap, HttpStatus.OK);
            }
            cloudinaryService.deleteImageByUrl(user.getAvatarUrl());
            user.setAvatarUrl("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg");
            repository.save(user);
            responseMap.put("message", "Delete user's avatar succes!!");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        }
    }

    public ResponseEntity<Map<String, String>> updateAvatar(MultipartFile image,
            HttpServletRequest request) throws IOException {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        Map<String, String> responseMap = new HashMap<>();
        if (user == null) {
            responseMap.put("message", "Can't find user or token is expired!!");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            if (!user.getAvatarUrl()
                    .equals("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")) {
                cloudinaryService.deleteImageByUrl(user.getAvatarUrl());
            }
            user.setAvatarUrl(cloudinaryService.uploadImage(image));
            repository.save(user);
            responseMap.put("message", "Update user's avatar succes!!");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        }
    }

}

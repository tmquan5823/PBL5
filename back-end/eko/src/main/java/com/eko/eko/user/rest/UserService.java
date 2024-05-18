package com.eko.eko.user.rest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.eko.eko.config.JwtService;
import com.eko.eko.user.entity.User;
import com.eko.eko.user.repository.UserRepository;
import com.eko.eko.util.CloudinaryService;
import com.eko.eko.util.FormatDate;

import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final JwtService jwtService;
    private final CloudinaryService cloudinaryService;
    private final PasswordEncoder passwordEncoder;
    private final FormatDate formatDate;

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
                    .dateOfBirth(formatDate.formatLocalDateTimeToString(user.getDateOfBirth()))
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
            user.setDateOfBirth(formatDate.formatStringToLocalDateTime(requestUser.getDateOfBirth()));
            repository.save(user);
            return UserProfileResponse.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .phoneNum(user.getTelephone())
                    .address(user.getAddress())
                    .email(user.getEmail())
                    .avatar_url(user.getAvatarUrl())
                    .dateOfBirth(formatDate.formatLocalDateTimeToString(user.getDateOfBirth()))
                    .message("Update user's profile success!!")
                    .state(true)
                    .build();
        }
    }

    public ResponseEntity<Map<String, Object>> changePassword(ChangePasswordRequest requestUser,
            HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        Map<String, Object> responseMap = new HashMap<>();
        if (user == null) {
            responseMap.put("message", "Không tìm thấy người dùng ; token hết hạn!!!");
            responseMap.put("state", false);
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            boolean isCorrect = passwordEncoder.matches(requestUser.getCurrentPassword(), user.getPassword());
            if (isCorrect == false) {
                responseMap.put("message", "Mật khẩu hiện tại không đúng!!");
                responseMap.put("state", false);
                return new ResponseEntity<>(responseMap, HttpStatus.OK);
            } else {
                user.setPassword(passwordEncoder.encode(requestUser.getNewPassword()));
                repository.save(user);
                responseMap.put("message", "Thay đổi mật khẩu thành công");
                responseMap.put("state", true);
                return new ResponseEntity<>(responseMap, HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<Map<String, Object>> deleteAvatar(HttpServletRequest request) throws IOException {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        Map<String, Object> responseMap = new HashMap<>();
        if (user == null) {
            responseMap.put("message", "Can't find user or token is expired!!");
            responseMap.put("state", false);
            return new ResponseEntity<>(responseMap, HttpStatus.BAD_GATEWAY);
        } else {
            if (user.getAvatarUrl()
                    .equals("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")) {
                responseMap.put("message", "Delete user's avatar succes!!");
                responseMap.put("state", true);
                return new ResponseEntity<>(responseMap, HttpStatus.OK);
            }
            cloudinaryService.deleteImageByUrl(user.getAvatarUrl());
            user.setAvatarUrl("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg");
            repository.save(user);
            responseMap.put("message", "Delete user's avatar succes!!");
            responseMap.put("avatar",
                    "http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg");
            responseMap.put("state", true);
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        }
    }

    public ResponseEntity<Map<String, Object>> updateAvatar(MultipartFile image,
            HttpServletRequest request) throws IOException {
        String authHeader = request.getHeader("Authorization");
        User user = jwtService.getUserFromAuthHeader(authHeader);
        Map<String, Object> responseMap = new HashMap<>();
        if (user == null) {
            responseMap.put("message", "Can't find user or token is expired!!");
            responseMap.put("state", false);
            return new ResponseEntity<>(responseMap, HttpStatus.BAD_REQUEST);
        } else {
            System.out.println("CHECK AVATAR : " + user.getAvatarUrl());
            if (!user.getAvatarUrl()
                    .equals("http://res.cloudinary.com/dwzhz9qkm/image/upload/v1714200690/srytaqzmgzbz7af5cgks.jpg")) {
                System.out.println("CHECK IF ELSE");
                cloudinaryService.deleteImageByUrl(user.getAvatarUrl());
            }

            user.setAvatarUrl(cloudinaryService.uploadImage(image));
            repository.save(user);
            responseMap.put("message", "Update user's avatar succes!!");
            responseMap.put("avatar", user.getAvatarUrl());
            responseMap.put("state", true);
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        }
    }

}

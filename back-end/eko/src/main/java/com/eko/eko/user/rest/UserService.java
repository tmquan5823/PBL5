package com.eko.eko.user.rest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.eko.eko.cloudinary.CloudinaryService;
import com.eko.eko.config.JwtService;
import com.eko.eko.user.UserRepository;

import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final JwtService jwtService;
    private final CloudinaryService cloudinaryService;

    public boolean isValidUser(String authHeader, Integer id) {

        String jwt = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        var user = repository.findByEmail(userEmail).orElseThrow();
        if (user.getRole().equals("ADMIN"))
            return true;
        return (id == user.getId());
    }

    public boolean isValidUser(String authHeader, String email) {

        String jwt = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        var user = repository.findByEmail(userEmail).orElseThrow();
        if (user.getRole().equals("ADMIN"))
            return true;
        return (email.equals(userEmail));
    }

    public UserProfileRespone getProfileById(Integer id, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (isValidUser(authHeader, id) == false) {
            new UserProfileRespone();
            return UserProfileRespone.builder().build();
        } else {
            var user = repository.findById(id).orElseThrow();
            new UserProfileRespone();
            return UserProfileRespone.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .phoneNum(user.getTelephone())
                    .address(user.getAddress())
                    .email(user.getEmail())
                    .build();
        }
    }

    public UserProfileRespone updateProfile(UserRequest requestUser, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (isValidUser(authHeader, requestUser.getEmail()) == false) {
            new UserProfileRespone();
            return UserProfileRespone.builder().build();
        } else {
            var user = repository.findByEmail(requestUser.getEmail()).orElseThrow();
            user.setAddress(requestUser.getAddress());
            user.setFirstname(requestUser.getFirstname());
            user.setLastname(requestUser.getLastname());
            user.setTelephone(requestUser.getTelephone());
            repository.save(user);
            new UserProfileRespone();
            return UserProfileRespone.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .phoneNum(user.getTelephone())
                    .address(user.getAddress())
                    .email(user.getEmail())
                    .build();
        }
    }

    public ResponseEntity<Map<String, String>> changePassword(ChangePasswordRequest requestUser,
            HttpServletRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'changePassword'");
    }

    public ResponseEntity<Map<String, String>> deleteAvatar(Integer id, HttpServletRequest request) throws IOException {
        String authHeader = request.getHeader("Authorization");
        Map<String, String> responseMap = new HashMap<>();
        if (isValidUser(authHeader, id) == false) {
            new UserProfileRespone();
            responseMap.put("message", "Can't delete another user's avatar!!");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            var user = repository.findById(id).orElseThrow();
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

    public ResponseEntity<Map<String, String>> updateAvatar(Integer id, MultipartFile image,
            HttpServletRequest request) throws IOException {
        String authHeader = request.getHeader("Authorization");
        Map<String, String> responseMap = new HashMap<>();
        if (isValidUser(authHeader, id) == false) {
            new UserProfileRespone();
            responseMap.put("message", "Can't update another user's avatar!!");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } else {
            var user = repository.findById(id).orElseThrow();
            cloudinaryService.deleteImageByUrl(user.getAvatarUrl());
            user.setAvatarUrl(cloudinaryService.uploadImage(image));
            repository.save(user);
            responseMap.put("message", "Update user's avatar succes!!");
            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        }
    }

}

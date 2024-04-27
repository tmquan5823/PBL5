package com.eko.eko.demo;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@Service
public class UploadDefaultAvatar {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadDefaultAvatar() throws IOException {
        // Lấy tệp hình ảnh mặc định từ thư mục tĩnh
        InputStream inputStream = new ClassPathResource("static/images/default-avatar.jpg").getInputStream();
        byte[] bytes = StreamUtils.copyToByteArray(inputStream);
        // Tải lên hình ảnh lên Cloudinary
        Map uploadResult = cloudinary.uploader().upload(bytes, null);
        // Trả về URL của hình ảnh đã được tải lên
        return uploadResult.get("url").toString();
    }
}

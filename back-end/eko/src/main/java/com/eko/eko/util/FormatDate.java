package com.eko.eko.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FormatDate {

    public LocalDateTime formatStringToLocalDateTime(String date) {
        LocalDateTime localDateTime = LocalDateTime.parse(date, DateTimeFormatter.ISO_DATE_TIME);
        return localDateTime;
    }

    public String formatLocalDateTimeToString(LocalDateTime dateTime) {
        if (dateTime == null)
            dateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        String formattedDate = dateTime.format(formatter);
        return formattedDate;
    }
}

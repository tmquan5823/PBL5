package com.eko.eko.util;

import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FormatDate {

    public LocalDateTime formatStringToLocalDateTime(String date) {
        LocalDateTime localDateTime = LocalDateTime.parse(date, DateTimeFormatter.ISO_DATE_TIME);
        return localDateTime;
    }

    public String formatLocalDateTimeToString(LocalDateTime dateTime) {
        if (dateTime == null)
            return null;
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        String formattedDate = dateTime.format(formatter);
        return formattedDate;
    }

    public Period convertStringToPeriod(String input) {
        char unit = input.charAt(input.length() - 1);
        int value = Integer.parseInt(input.substring(0, input.length() - 1));

        switch (unit) {
            case 'D':
                return Period.ofDays(value);
            case 'W':
                return Period.ofWeeks(value);
            case 'M':
                return Period.ofMonths(value);
            default:
                throw new IllegalArgumentException("Định dạng chuỗi không hợp lệ");
        }
    }
}

package com.eko.eko.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eko.eko.money.model.Budget;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@Service
public class JsonConverter {
    private final ObjectWriter objectWriter;
    private final ObjectMapper objectMapper;

    @Autowired
    public JsonConverter(ObjectMapper objectMapper) {
        this.objectWriter = objectMapper.writer().withDefaultPrettyPrinter();
        this.objectMapper = objectMapper;
    }

    public String convertObjectToJson(Object object) throws JsonProcessingException {
        return objectWriter.writeValueAsString(object);
    }

    public Budget convertStringToBudget(String jsonString) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, Budget.class);
    }
}

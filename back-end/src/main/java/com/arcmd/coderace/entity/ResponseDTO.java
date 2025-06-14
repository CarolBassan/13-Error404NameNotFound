package com.arcmd.coderace.entity;

import lombok.Data;

@Data
public class ResponseDTO {
    String message;

    public ResponseDTO(String msg) {
        this.message = msg;
    }
}

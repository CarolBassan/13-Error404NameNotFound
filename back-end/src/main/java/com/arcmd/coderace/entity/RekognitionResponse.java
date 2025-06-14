package com.arcmd.coderace.entity;

import lombok.Data;
import java.util.List;

import com.arcmd.coderace.entity.rekognition.Label;

@Data
public class RekognitionResponse {
    private List<Label> labels;
    private String labelModelVersion;
}

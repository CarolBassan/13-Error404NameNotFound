package com.arcmd.coderace.entity.rekognition;

import lombok.Data;
import java.util.List;

@Data
public class Label {
    private String name;  
    private Float confidence;
    private List<Instance> instances;
}

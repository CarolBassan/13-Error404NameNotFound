package com.arcmd.coderace.entity.rekognition;

import lombok.Data;

@Data
public class Instance {
    private BoundingBox boundingBox;
    private Float confidence;
}

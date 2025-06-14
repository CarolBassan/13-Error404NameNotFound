package com.arcmd.coderace.entity.rekognition;

import lombok.Data;

@Data
public class BoundingBox {
    private Float width;
    private Float height;
    private Float left;
    private Float top;
}

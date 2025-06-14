package com.arcmd.coderace.controller;

import com.arcmd.coderace.service.RekognitionService;
import com.arcmd.coderace.service.TranslationService;
import com.arcmd.coderace.entity.ResponseDTO;
import com.arcmd.coderace.entity.rekognition.RekognitionRequest;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class RekognitionController {

    private final RekognitionService rekognitionService;
    private final TranslationService translationService;

    public RekognitionController(RekognitionService rekognitionService,
            TranslationService translationService) {
        this.rekognitionService = rekognitionService;
        this.translationService = translationService;
    }

    @PostMapping("/image")
    public ResponseDTO detectLabels(@RequestBody RekognitionRequest base64Image) {
        String rekognition = rekognitionService.detectLabelsFromBase64(base64Image.getImage());

        String translation = translationService.translateText(rekognition);

        return new ResponseDTO(translation);
    }
}

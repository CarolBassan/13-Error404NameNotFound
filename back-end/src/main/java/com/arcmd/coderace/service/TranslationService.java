package com.arcmd.coderace.service;

import org.springframework.stereotype.Service;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.translate.TranslateClient;
import software.amazon.awssdk.services.translate.model.TranslateTextRequest;
import software.amazon.awssdk.services.translate.model.TranslateTextResponse;

@Service
public class TranslationService {

    private final TranslateClient translateClient;

    public TranslationService() {

        this.translateClient = TranslateClient.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
        String region = translateClient.serviceClientConfiguration().region().toString();

        System.out.println("A região do translate é: " + region);
    }

    public String translateText(String text) {
        TranslateTextRequest translateTextRequest = TranslateTextRequest.builder()
                .text(text)
                .sourceLanguageCode("en")
                .targetLanguageCode("pt")
                .build();

        TranslateTextResponse translateTextResponse = translateClient.translateText(translateTextRequest);
        return translateTextResponse.translatedText();
    }
}

package com.arcmd.coderace.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.*;

import com.arcmd.coderace.entity.RekognitionResponse;
import com.arcmd.coderace.entity.rekognition.BoundingBox;
import com.arcmd.coderace.entity.rekognition.Instance;
import com.arcmd.coderace.entity.rekognition.Label;

import org.springframework.stereotype.Service;

@Service
public class RekognitionService {

    private RekognitionClient rekognitionClient;

    public RekognitionService() {
        this.rekognitionClient = RekognitionClient.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();

        String region = rekognitionClient.serviceClientConfiguration().region().toString();

        System.out.println("A região do reko é: " + region);
    }

public String detectLabelsFromBase64(String base64Image) {
    if (base64Image.contains(",")) {
        base64Image = base64Image.split(",")[1];
    }

    byte[] imageBytes = Base64.getDecoder().decode(base64Image);
    Image image = Image.builder()
            .bytes(SdkBytes.fromByteArray(imageBytes))
            .build();

    DetectLabelsRequest request = DetectLabelsRequest.builder()
            .image(image)
            .maxLabels(10)
            .minConfidence(75F)
            .build();

    DetectLabelsResponse response = rekognitionClient.detectLabels(request);

    RekognitionResponse rekognitionResponse = new RekognitionResponse();
    rekognitionResponse.setLabelModelVersion(response.labelModelVersion());

    List<Label> labels = response.labels().stream()
            .filter(label -> !label.instances().isEmpty())
            .map(label -> {
                Label mappedLabel = new Label();
                mappedLabel.setName(label.name());
                mappedLabel.setConfidence(label.confidence());

                List<Instance> instances = label.instances().stream()
                        .map(instance -> {
                            Instance mappedInstance = new Instance();
                            mappedInstance.setConfidence(instance.confidence());

                            BoundingBox boundingBox = new BoundingBox();
                            boundingBox.setWidth(instance.boundingBox().width());
                            boundingBox.setHeight(instance.boundingBox().height());
                            boundingBox.setLeft(instance.boundingBox().left());
                            boundingBox.setTop(instance.boundingBox().top());
                            mappedInstance.setBoundingBox(boundingBox);

                            return mappedInstance;
                        })
                        .collect(Collectors.toList());
                mappedLabel.setInstances(instances);

                return mappedLabel;
            })
            .collect(Collectors.toList());

    rekognitionResponse.setLabels(labels);

    return generateSceneDescription(labels);
}


    private String generateSceneDescription(List<Label> labels) {
        StringBuilder sentence = new StringBuilder();
        sentence.append("In your scene, there are ");

        List<String> labelDescriptions = new ArrayList<>();

        for (Label label : labels) {
            int numberOfInstances = label.getInstances().size();
            String name = label.getName();

            labelDescriptions.add(String.format("%d %s", numberOfInstances, name));
        }

        sentence.append(String.join(", ", labelDescriptions));
        sentence.append(" in the picture.");

        return sentence.toString();
    }
}

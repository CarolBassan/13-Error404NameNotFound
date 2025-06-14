# Use uma imagem do OpenJDK como base
FROM openjdk:17-jdk-slim AS build

WORKDIR /app
COPY target/coderace-0.0.1-SNAPSHOT.jar app.jar

# Comando para rodar o aplicativo
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

EXPOSE 8080

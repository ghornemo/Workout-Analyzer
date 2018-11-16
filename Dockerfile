FROM openjdk:8-jdk-alpine

RUN mkdir project

COPY . project

WORKDIR project

RUN ls

RUN ./mvnw -DskipTests=true package

EXPOSE 8080

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","target/workout-0.0.1-SNAPSHOT.jar"]


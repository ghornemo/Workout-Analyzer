FROM openjdk:8-jdk-alpine

RUN mkdir project

COPY . project

RUN ./mvnw -DskipTests=true  package

ENTRYPOINT ["java","-jar","project/target/workout-0.0.1.jar"]
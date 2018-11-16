FROM openjdk:8-jdk-alpine

RUN mkdir project

COPY . project

WORKDIR project

RUN ls

RUN ./mvnw -DskipTests=true package

EXPOSE 80

ENTRYPOINT ["java","=Dserver.port=80","-jar","target/workout-0.0.1-SNAPSHOT.jar"]

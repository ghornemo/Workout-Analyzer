FROM openjdk:8-jdk-alpine

VOLUME /tmp

RUN mkdir project

COPY . project

WORKDIR project

RUN ls

RUN ./mvnw -DskipTests=true package

EXPOSE 8080

CMD java -jar target/workout-0.0.1-SNAPSHOT.jar


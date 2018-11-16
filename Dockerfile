FROM openjdk:8-jdk-alpine

VOLUME /tmp

RUN mkdir project

COPY . project

WORKDIR project

RUN ls

RUN ./mvnw -DskipTests=true package

EXPOSE 8080

RUN java -jar target/workout-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/project/target/workout-0.0.1-SNAPSHOT.jar"]


FROM maven

COPY src src

COPY pom.xml pom.xml

RUN mvn install

RUN mvn compile

ENTRYPOINT mvn spring-boot:run

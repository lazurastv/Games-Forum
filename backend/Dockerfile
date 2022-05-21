FROM maven as build

COPY pom.xml .

RUN mvn verify --fail-never

COPY src .

RUN mvn compile

ENTRYPOINT mvn spring-boot:run
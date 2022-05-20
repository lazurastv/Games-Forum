FROM maven

COPY . .

RUN mvn install

RUN mvn compile

ENTRYPOINT mvn spring-boot:run

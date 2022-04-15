FROM maven

WORKDIR /usr/src/app

COPY . .

RUN mvn install

RUN mvn compile

ENTRYPOINT mvn spring-boot:run

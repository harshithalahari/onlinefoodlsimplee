# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# copy wrapper and .mvn first (so they get cached)
COPY mvnw . 
COPY .mvn/ .mvn

# ensure wrapper is executable
RUN chmod +x mvnw

# copy pom and source
COPY pom.xml .
COPY src ./src

# run the wrapper to build
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 3000

ENTRYPOINT ["java", "-jar", "app.jar"]

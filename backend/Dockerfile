# Используем официальный образ OpenJDK 11 как базовый образ
FROM openjdk:17-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем JAR-файл в контейнер
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Открываем порт, на котором работает приложение
EXPOSE 8083

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "app.jar"]

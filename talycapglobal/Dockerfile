# Usar una imagen base de OpenJDK
FROM openjdk:17-jdk-alpine

# Establecer el idioma
ENV LANGUAGE='en_US:en'

# Crear un directorio para la aplicación
VOLUME /tmp

# Copiar las dependencias y el archivo JAR de la aplicación
COPY target/*.jar app.jar

# Exponer el puerto en el que la aplicación se ejecuta
EXPOSE 2024

# Configurar el usuario para ejecutar el contenedor
USER 185

# Establecer las opciones de JVM
#ENV JAVA_OPTS="-Djava.security.egd=file:/dev/./urandom"

# Configurar el comando para ejecutar la aplicación
ENTRYPOINT ["java","-jar","/app.jar"]

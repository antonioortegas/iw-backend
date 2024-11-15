# iw-backend
Repositorio para el examen de backend de Ingeniería Web

## Instrucciones de instalación y despliegue

1. Asegurarse de que Docker Desktop (y Docker engine) se encuentren instalados y en funcionamiento.
2. Clonar el proyecto del repositorio GitHub correspondiente, o bien descomprimir el zip de la entrega con el código fuente.
[Link a GitHub](https://github.com/antonioortegas/iw-backend.git)
3. Hacer cd al root del proyecto, (normalmente al clonarlo, hacer
    ```bash
    cd iw-backend/
    ```
    siendo este el nombre de la carpeta del proyecto. En caso de haber descomprimido el zip, podemos seleccionar la carpeta > click derecho > open in terminal
4. Una vez estamos en la root del proyecto, debemos copiar el contenido de ‘.env.example’ a un archivo al que debemos llamar ‘.env’ si este no existe. En caso de que la terminal usada lo permita, podemos hacer:
    ```bash
    cp .env.example .env
    ```
    este .env será el que utilice nuestro docker-compose para las variables de entorno.
5. Una vez tenemos nuestro .env, simplemente ejecutamos nuestros contenedores con
    ```bash
    docker compose up -d
    ```
    [para detenerlos, docker compose down]
    esto pulleará la imagen de una instancia de mongoDB oficial desde dockerhub, y construirá el contenedor para nuestra aplicación.
6. La aplicación debería estar en funcionamiento en ‘http://localhost:3000/’.
7. Los endpoints desarrollados y las peticiones de prueba para comprobar su correcto funcionamiento se encuentran definidos en una colección Postman adjunta a la entrega.
8. Para poblar la base de datos con algunos datos de prueba, ejecutar primero todas las request POST de postman en collaborators/ y tasks/ (son 8 en total), que contienen datos ‘dummy’ para crear 4 colaboradores y 4 tareas interconectadas.
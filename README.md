# OnlyCourses - backend &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm)

> Repositorio de la parte del backend del proyecto OnlyCourses

El proyecto trata de una plataforma de educación online. En este caso se ha desarrollado la API que implementará esta plataforma

## Iniciar el proyecto

Para poder iniciar la aplicación tenemos que tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/) y [Yarn](https://yarnpkg.com/)

> Para que la aplicación funcione correctamente debemos configurar primero algunas
> variables de entorno que servirán para guardar cierta información importante.
>
> Las variables de entorno a utilizar las definiremos en un archivo `.env` y los
> nombres de estas las encontraremos dentro del archivo `.env.example`.

```bash
# Instalamos las dependencias
yarn install

# Ejecutamos Docker compose
docker compose -f docker-compose.dev.yml up --build
```

Una vez realizado estos pasos podemos dirigirnos a http://localhost:3000.

Si queremos parar el contenedor podemos usar el siguiente comando en otra terminal

```bash
docker compose -f docker-compose.dev.yml down
```

## Base de datos

La API hace uso de una base de datos relacional usando MySQL, por lo que una vez la aplicación esté en ejecución abriremos otra terminal y seguiremos los siguientes pasos por si queremos conectarnos a herramientas como MySQL Workbench o similares

```bash
# Accedemos a la terminal dentro del contenedor
docker exec -it yachay-db /bin/bash

# Nos conectamos a MySQL dentro del contendor
mysql -u root -p
# Aqui seguro nos pedira una constraseña, ponemos 'root'

# Una vez dentro de mysql creamos un nuevo usario
create user 'user'@'%' identified by 'pass'; # usuario que puede conectarse desde cualquier IP

grant all privileges on *.* to 'user'@'%' with grant options;

flush privileges;
```

Reiniciamos el contenedor y ya podremos conectarnos a nuestra instancia de mysql desde cualquier aplicación

## Instalar nuevas dependencias

Si deseamos agregar alguna librería nueva, primero deberemos parar el contenedor

```bash
docker compose -f docker-compose.dev.yml down
```

Luego procedemos a instalar la librería/dependencia en cuestión

```bash
yarn add <dependencie>

# or

yarn add -D <dependencie>
```

Finalmente volvemos a construir todo el servicio de contenedores

```bash
docker compose -f docker-compose.dev.yml up --build
```

> Nota: Si necesitamos reiniciar el contenedor por alguna circustancia, la
> siguiente vez que lo iniciemos ya no es necesario que agregremos --build
>
> --build solo lo usamos cuando hacemos un cambio que modifica la estructura
> interna del contenedor como tal, como por ejemplo, cuando agregamos
> nuevas librerías/dependencias

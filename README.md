# UM Central Module

Un proyecto para la gestión de usuarios y permisos de los sistemas universitarios.

## Configure

Par poder correr el proyecto hace falta configurar las variables de entorno de la siguiente manera.

 1. En la raíz del proyecto crear una carpeta llamada **local-scripts**
 2. Dentro de la carpeta creada anteriormente crear un fichero llamado **development-local.sh** con el siguiente contenido

> export JWT_KEY='4xL1e0ren2SOyN1rNJpR12CCeObcy69'  
   export PORT=4015  
   export NODE_ENV='development-local'  
   export UM_API_KEY='5c828760d8a61a001c703fa9'

## Install and run

Preferentemente usar **yarn** de la siguiente manera

    yarn install && yarn dev

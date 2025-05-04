# COMMERCE SYSTEM FRONTEND

El siguiente proyecto posee las UI de un sistema de órdenes de compra con usuarios y productos.

### Requerimientos de software

Se debe tener instalados los siguientes programas

- Node js

- npm

### Configuración previa del proyecto

Antes de ejecutar el proyecto, asegúrate de renombrar y eliminar la extensión `.sample` de los siguientes archivos en el directorio raíz del proyecto:

- .env.example

Luego necesitamos remplazar el contenido del archivo .env de la siguiente forma:

```bash

VITE_EVENT_API={url de api}

```

Cambiar {url de api} por la url correspondiente.

```bash

VITE_EVENT_API=http://localhost:3000/api/  por  ejemplo

```

## Configuración Proyecto
1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/ingestebancorrea/commerce-system-fe.git

2. Instalación de Dependencias
    Después de clonar el repositorio y realizar la configuración previa, instala las dependencias del proyecto ejecutando el siguiente comando en tu terminal dentro del directorio del proyecto:

    ```bash
    npm install 

3. Ejecutar proyecto con el siguiente comando:
    ```bash
    npm run dev

# Licencia
Este proyecto está bajo la Licencia MIT.
## Uso de Docker, Docker Compose y Docker Hub

### 1. Requisitos previos

- Tener instalado Docker y Docker Compose.
- Acceso a Docker Hub (usuario: `dcmendozar`).

### 2. Levantar los servicios

Desde la raíz del proyecto:

```powershell
docker-compose pull         # Descarga las imágenes más recientes desde Docker Hub
docker-compose up -d       # Levanta los servicios en segundo plano
```

Esto inicia:
- Frontend React (`front_react`) en http://localhost:3000
- Backend Node.js (`backend`) en http://localhost:4000
- Base de datos MySQL (`db`) en el puerto 3307

### 3. Monitorear servicios

Ver contenedores activos:
```powershell
docker ps
```

Ver logs de un servicio (ejemplo frontend):
```powershell
docker logs front_react
```

Ver logs del backend:
```powershell
docker logs backend
```

Ver logs de la base de datos:
```powershell
docker logs db
```

### 4. Acceso a los servicios

- **Frontend:** http://localhost:3000
- **Backend (API):** http://localhost:4000
- **MySQL:** localhost:3307 (usuario, contraseña y base según `.env`)

### 5. Cambiar variables de entorno

En la carpeta `backend/` puedes alternar entre entornos con:

```powershell
.\switch-env.ps1 .env.docker   # Para entorno Docker
.\switch-env.ps1 .env.local    # Para entorno local
```

### 6. Actualizar imágenes desde Docker Hub

Si hay una nueva versión en Docker Hub:
```powershell
docker-compose pull
docker-compose up -d
```

### 7. Limpiar contenedores antiguos (opcional)

```powershell
docker container prune
docker image prune
```
<a name="readme-top"></a>

<div align="center">

<img src="logo.png" alt="logo" width="140" height="auto" style="border-radius:50%"   />
<br/>
<h3><b>NextLevelBL-Develop</b></h3>

</div>

# ✅ TABLE OF CONTENTS
- [📖 About the Project](#about-project)
  - [⚒️ Build With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
 - [💻 Getting Started](#getting-started)
   - [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Install](#install)
   - [Usage](#usage)
   - [Deployment](#deployment)
   - [🔀 Git Branching & GitHub Setup](#git-setup)
- [👥 Authors](#authors)
- [🕹️ Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐ Show your Support](#support)
- [👏 Acknowledgements ](#acknowledgements)
- [❓ FAQ ](#faq)
- [📃 License](#license)


# 🚀 NextLevelBL-Develop <a name="about-project"></a>

NextLevelBL-Develop es una plataforma de gestión y ventas desarrollada con Node.js para el backend y React para el frontend. El proyecto está estructurado en dos carpetas principales:

- 📦 **backend/**: API RESTful con Node.js y Express.
- 💻 **Front_REACT/**: Interfaz de usuario moderna con React.

Incluye integración de linters (ESLint y Stylelint), pruebas automáticas y flujos de trabajo con GitHub Actions para asegurar calidad y despliegue continuo.


## ⚒️ Tecnologías y Herramientas <a name="built-with"></a>

### 🛠️ Tech Stack <a name="tech-stack"></a>

- 🟩 **Node.js** (backend)
- ⚛️ **React** (frontend)
- 🧹 **ESLint** y **Stylelint** (calidad de código)
- 🧪 **Jest** y **React Testing Library** (pruebas)
- 🐙 **Git** y **GitHub** (control de versiones y CI/CD)

### ✨ Características principales <a name="key-features"></a>

- 🔒 Autenticación y rutas protegidas
- 🛒 Gestión de productos y carrito
- 📦 API RESTful
- 🧹 Linters y buenas prácticas
- 🤖 Workflows automáticos con GitHub Actions


## 💻 Cómo empezar <a name="getting-started"></a>

Sigue estos pasos para clonar y ejecutar el proyecto:

### 📋 Prerrequisitos

- [Node.js](https://nodejs.org/)  
- [Git](https://git-scm.com/)

### 📦 Instalación y estructura

1. Clona el repositorio:
   ```sh
   git clone https://github.com/duartixed/NextLevelBL.git
   cd NextLevelBL
   ```
2. Instala dependencias en cada subproyecto:
   ```sh
   cd backend
   npm install
   cd ../Front_REACT
   npm install
   ```

### ▶️ Uso

- Para iniciar el backend:
  ```sh
  cd backend
  npm start
  ```
- Para iniciar el frontend:
  ```sh
  cd ../Front_REACT
  npm start
  ```


### 🧪 Pruebas y linters

- Ejecuta linters en backend:
  ```sh
  cd backend
  npm run lint
  ```
- Ejecuta linters en frontend:
  ```sh
  cd Front_REACT
  npm run lint
  ```
- Ejecuta tests en backend:
  ```sh
  cd backend
  npm test
  ```
- Ejecuta tests en frontend:
  ```sh
  cd Front_REACT
  npm test
  ```


### 🔀 Flujo de trabajo con Git y GitHub <a name="git-setup"></a>

1. Inicializa el repositorio y agrega el remoto:
   ```sh
   git init
   git remote add origin https://github.com/duartixed/NextLevelBL.git
   ```
2. Crea ramas para desarrollo y características:
   ```sh
   git checkout -b develop
   git checkout -b feature/nueva-funcionalidad
   ```
3. Sube tus ramas y abre Pull Requests en GitHub para revisión y despliegue.


## 👥 Autores <a name="authors"></a>

👤 Kevin Julián Rodríguez López  
👤 Daniel Camilo Mendoza Rodriguez   
👤 Franchesca Vargas  

- 🐙 GitHub: [@Ridemolition](https://github.com/Ridemolition)
- 🐙 GitHub: [@duartixed](https://github.com/duartixed)
- 🐙 GitHub: [@Franchesca777](https://github.com/Franchesca777)


## 🕹️ Próximas características <a name="future-features"></a>

- [ ] 🚦 Integración completa con CI/CD
- [ ] 🧹 Soporte para más linters y herramientas de calidad
- [ ] 🌎 Documentación en múltiples idiomas


## 🤝 Contribuciones <a name="contributing"></a>

¡Las contribuciones, reportes de errores y sugerencias son bienvenidas! Consulta la [página de issues](https://github.com/Ridemolition/NextLevelBL-Develop/issues).


## ⭐ Apoya este proyecto

Si te gusta este proyecto, dale una estrella ⭐ en GitHub.


## 👏 Agradecimientos <a name="acknowledgements"></a>

Gracias a los compañeros y a los instructores del SENA por su apoyo en este aprendizaje.


## 📃 Licencia <a name="license"></a>

Este proyecto está bajo la licencia MIT. Puedes ver el archivo de licencia completo aquí: [LICENSE.md](./LICENSE.md).

<p align="right">⬆️ <a href="#readme-top">Volver arriba</a></p>


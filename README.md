# Instrucciones para correr el proyecto

Este repositorio contiene una aplicación fullstack dividida en dos carpetas:

- `/frontend`: cliente web construido con Next.js
- `/backend`: API REST construida con NestJS

## Requisitos

- Tener instalado Node.js (versión 18 o superior recomendada)
- Usar npm como gestor de paquetes
- Instalar Nest CLI para facilitar algunos comandos:

```bash
npm install -g @nestjs/cli
```

## Instalar dependencias

1. Entrar a la carpeta del frontend e instalar las dependencias:

```bash
cd frontend
npm install
```

2. Volver a la raíz y entrar a la carpeta del backend:

```bash
cd ../backend
npm install
```

## Levantar el proyecto

1. Levantar el backend en modo desarrollo:

```bash
cd backend
npm run start:dev
```

2. Levantar el frontend:

```bash
cd frontend
npm run dev
```

## Ejecutar test en backend

Para correr los test y ver la cobertura:

```bash
cd backend
npm run test
npm run test:cov
```

## Notas

- Los productos están guardados en un archivo JSON local dentro de `/backend/src/data`

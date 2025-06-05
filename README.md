# Project Setup Instructions

This repository contains a fullstack application divided into two folders:

- `/frontend`: Web client built with Next.js
- `/backend`: REST API built with NestJS

## Requirements

- Node.js (version 18 or higher recommended)
- npm as package manager
- Nest CLI (optional):

```bash
npm install -g @nestjs/cli
```

## Environment Setup

1. In the frontend directory, copy the example environment file:
```bash
cd frontend
cp .env.example .env
```

2. In the backend directory, copy the example environment file:
```bash
cd backend
cp .env.example .env
```

## Install Dependencies

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Install backend dependencies:

```bash
cd ../backend
npm install
```

## Run the Project

1. Start the backend in development mode:

```bash
cd backend
npm run start:dev
```

2. Start the frontend (in other terminal):

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Notes

- Products are stored in a local JSON file in `/backend/src/data`
- To run tests and check the coverage run:

```bash
cd backend
npm run test
npm run test:cov
```

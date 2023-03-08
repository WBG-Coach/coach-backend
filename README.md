# Coache digital SL API

## Setup dev

  - Copy .env.example to .env
  - Run `npm install`
  - Run `npm run start:dev`

## Setup prod with docker

  - Copy .env.example to .env
  - Run `npm run build-docker` or `docker build -t coach-backend-sl .`
  - Run `docker-compose up -d`
  - Open `http://localhost:3000/api-docs`

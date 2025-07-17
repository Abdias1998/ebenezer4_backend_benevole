import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS pour permettre les requêtes depuis le frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'https://ebenezer-benevole.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Validation globale des DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Backend Ebenezer 4 démarré sur le port ${port}`);
  console.log(`📊 API Documentation: http://localhost:${port}/api`);
  console.log(`🔐 Admin par défaut: admin / ebenezer2024`);
}

bootstrap();
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

// // src/main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { exec } from 'child_process';

// async function bootstrap() {

//   const mongoCommand = exec('docker-compose up -d', { cwd: __dirname + '/../' });

//   mongoCommand.stdout?.on('data', (data) => {
//     console.log(data);
//   });

//   mongoCommand.stderr?.on('data', (data) => {
//     console.error(data);
//   });
//   const app = await NestFactory.create(AppModule);

//   const config = new DocumentBuilder()
//     .setTitle('Document Capture API')
//     .setDescription('API for uploading and extracting data from documents')
//     .setVersion('1.0')
//     .addTag('documents')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api-docs', app, document);

//   process.on('SIGINT', () => {
//     exec('docker-compose down', { cwd: __dirname + '/../' }, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error stopping MongoDB: ${error.message}`);
//         return;
//       }
//       console.log(`MongoDB stopped: ${stdout}`);
//     });
//     process.exit();
//   });

//   await app.listen(3000);
// }
// bootstrap();


// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  // Create NestJS application
  const app = await NestFactory.create(AppModule);

  // Swagger setup for API documentation
  const config = new DocumentBuilder()
    .setTitle('Document Capture API')
    .setDescription('API for uploading and extracting data from documents')
    .setVersion('1.0')
    .addTag('documents')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Start the NestJS application
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap();



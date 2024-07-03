import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';

import { AuthModule } from './auth/auth.module';
import { ComponentModule } from './component/component.module';
import { MulterModule } from '@nestjs/platform-express';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [

    MulterModule.register({
      dest: './uploads', // Carpeta donde se guardarán los archivos cargados
    }),
    
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'granabastos_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '1h' },
    }),

    AuthModule,
    
    ComponentModule,

    PagesModule,

  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  }
}

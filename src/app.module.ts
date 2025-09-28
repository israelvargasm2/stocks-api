import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from './core/stocks/stock.module';
import { StockOrmEntity } from './core/stocks/entities/stock.orm-entity';
import { StockFromApiModule } from './core/stocks-from-api/stock-from-api.module';
import { UserModule } from './core/users/user.module';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { UserOrmEntity } from './core/users/entities/user-orm.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Para que esté disponible en todos los módulos
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: 5432,
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        ssl: configService.get<string>('POSTGRES_SSL') === 'true',
        entities: [
          StockOrmEntity, 
          UserOrmEntity
        ],
        synchronize: false, // solo en dev
      })
    }),
    StockModule,
    StockFromApiModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

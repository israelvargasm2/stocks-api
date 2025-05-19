import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from './core/stocks/stock.module';
import { StockOrmEntity } from './core/stocks/entities/stock.orm-entity';
import { StockFromApiModule } from './core/stocks-from-api/stock-from-api.module';
import { UserOrmEntity } from './core/users/entities/user.orm-entity';
import { UserModule } from './core/users/user.module';
import { AuthenticationModule } from './core/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [StockOrmEntity, UserOrmEntity], 
      synchronize: false, // ¡Cuidado en producción!
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
//TIGCEH8DAJ3I5JBF
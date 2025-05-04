import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from './core/stocks/stock.module';
import { StockOrmEntity } from './core/stocks/entities/stock.orm-entity';
import { StockFromApiModule } from './core/stocks-from-api/stock-from-api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [StockOrmEntity], 
      synchronize: true, // ¡Cuidado en producción!
    }),
    StockModule,
    StockFromApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//TIGCEH8DAJ3I5JBF
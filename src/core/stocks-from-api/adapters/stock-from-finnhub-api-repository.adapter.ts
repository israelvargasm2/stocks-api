import { Injectable } from '@nestjs/common';
import { StockFromApiRepositoryPort } from '../ports/stock-from-api-repository.port';
import { StockFromApi } from '../stock-from-api';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StockFromFinnhubApiRepositoryAdapter implements StockFromApiRepositoryPort {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }

    async findStocks(symbols: string[]): Promise<StockFromApi[]> {
        const urls: { url: string; symbol: string }[] = [];
        for (let symbol of symbols) {
            const url = `${this.configService.get<string>('FINNHUB_URL')}?symbol=${symbol}&token=${this.configService.get<string>('FINNHUB_API_KEY')}`;
            urls.push({ url, symbol });
        }
        const currentPrices: StockFromApi[] = [];
        for (let url of urls) {
            const response$ = this.httpService.get(url.url);
            const response = await lastValueFrom(response$);
            const data = response.data;
            currentPrices.push({
                symbol: url.symbol,
                price: data.c,
            });
        }
        return currentPrices;
    }
}

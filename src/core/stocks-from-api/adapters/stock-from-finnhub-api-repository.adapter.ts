import { Injectable } from '@nestjs/common';
import { StockFromApiRepositoryPort } from '../ports/stock-from-api-repository.port';
import { StockFromApi } from '../stock-from-api';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StockFromFinnhubApiRepositoryAdapter implements StockFromApiRepositoryPort {
    private readonly API_KEY = 'd093sghr01qnv9cgdrb0d093sghr01qnv9cgdrbg';
    private readonly BASE_URL = 'https://finnhub.io/api/v1/quote';

    constructor(private readonly httpService: HttpService) { }

    async findStocks(symbols: string[]): Promise<StockFromApi[]> {
        const urls: { url: string; symbol: string }[] = [];
        for (let symbol of symbols) {
            const url = `${this.BASE_URL}?symbol=${symbol}&token=${this.API_KEY}`;
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

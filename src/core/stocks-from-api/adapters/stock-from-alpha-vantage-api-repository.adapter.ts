import { Injectable } from '@nestjs/common';
import { StockFromApiRepositoryPort } from '../ports/stock-from-api-repository.port';
import { StockFromApi } from '../stock-from-api';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StockFromAlphaVantageApiRepositoryAdapter implements StockFromApiRepositoryPort {
    private readonly API_KEY = 'IVA1QIGW2FEO4BWL';
    private readonly BASE_URL = 'https://www.alphavantage.co/query';

    constructor(private readonly httpService: HttpService) { }

    async findStocks(symbols: string[]): Promise<StockFromApi[]> {
        const urls: string[] = [];
        for (let symbol of symbols) {
            const url = `${this.BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.API_KEY}`;
            urls.push(url);
        }
        const currentPrices: StockFromApi[] = [];
        for (let url of urls) {
            const response$ = this.httpService.get(url);
            const response = await lastValueFrom(response$);
            const quote = response.data['Global Quote'];
            currentPrices.push({
                symbol: quote['01. symbol'],
                price: parseFloat(quote['05. price']),
            });
        }
        return currentPrices;
    }
}

import { Injectable } from '@nestjs/common';
import { StockFromApiRepositoryPort } from '../ports/stock-from-api-repository.port';
import { StockFromApi } from '../stock-from-api';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StockFromAlphaVantageApiRepositoryAdapter implements StockFromApiRepositoryPort {

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }

    async findStocks(symbols: string[]): Promise<StockFromApi[]> {
        const urls: string[] = [];
        for (let symbol of symbols) {
            const url = `${this.configService.get<string>('ALPHA_VANTAGE_URL')}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.configService.get<string>('ALPHA_VANTAGE_API_KEY')}`;
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

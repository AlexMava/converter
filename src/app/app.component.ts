import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WidgetComponent } from './widget/widget.component';
import { HeaderComponent } from './header/header.component';

import { CurrencyService } from './currency.service';
import { Currency } from "./currency";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WidgetComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title: string = 'converter';
  rates: Currency[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor(private currencyService: CurrencyService) { }

  getRates(): void {
    this.currencyService.getCurrencies().subscribe(rates => this.rates = this.filterRates(rates));
  }

  ngOnInit(): void { 
    this.getRates();
  };

  filterRates(allItems: Currency[]) {
    return allItems.filter((item: Currency) => (item['cc'] === 'USD') || item['cc'] === 'EUR' || item['cc'] === 'PLN');
  }
}

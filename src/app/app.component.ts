import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetComponent } from './widget/widget.component';
import { HeaderComponent } from './header/header.component';
import ConverterService from './converter.service'

const exchangeService = new ConverterService();  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WidgetComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'converter';
  rates = [];
  loading: boolean = false;
  error: boolean = false;

  onDataLoaded = (newData: any) => {
    this.rates = newData;
  }

  ngOnInit() { 
    exchangeService.getAllRates()
      .then(this.onDataLoaded)
      .catch(() => console.log('Error by saving data to the state'))
  };

  getRate() {
    // this.rates = 8;
  }
}

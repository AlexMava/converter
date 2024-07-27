import { Component, Input} from '@angular/core';
import { Currency } from '../currency';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  @Input() rates: any;

  inputFirstValue: number = 0;
  inputSecondValue: number = 0;
  selectFirstValue: string = 'USD';
  selectSecondValue: string = 'UAH';

  onChange(e: any) {
    const target = e.target || e.srcElement || e.currentTarget,
      idAttr = target.attributes.id,
      theId = idAttr.nodeValue;

      if (e.target.value) {
        let theCurrency = this.rates.filter((item: Currency) => (item['cc'] === this.selectFirstValue));    
        this.inputSecondValue =  e.target.value * theCurrency[0]['rate'];
      }
  }
}

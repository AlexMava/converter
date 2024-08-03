import { Component, Input} from '@angular/core';
import { Currency } from '../currency';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgFor],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  @Input() rates: Currency[] = [];

  inputFirstValue: number = 0;
  inputSecondValue: number = 0;
  selectFirstValue: string = 'USD';
  selectSecondValue: string = 'UAH';

  onChange(e: any) {
    const target = e.target || e.srcElement || e.currentTarget,
      theParent = target.closest(".js-field-group"),
      theParentId = theParent.attributes.id.nodeValue,
      theInput = theParent.children[0],
      theSelect = theParent.children[1];

      let theCurrency = this.rates.filter((item: Currency) => (item['cc'] === theSelect.value));

      if (theCurrency && theParentId === 'field-group-1') {    
        this.inputSecondValue =  +(theInput.value * theCurrency[0]['rate']).toFixed(3);
      } else if (theParentId === 'field-group-2' && this.selectFirstValue) {
        theCurrency = this.rates.filter((item: Currency) => (item['cc'] === this.selectFirstValue))
        this.inputFirstValue =  +(this.inputSecondValue / theCurrency[0]['rate']).toFixed(3);
      }
  }
}

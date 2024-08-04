import { Component, Input} from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

import { Currency } from '../currency';
import { GroupComponent } from './group/group.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, GroupComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
})

export class WidgetComponent {

  title: string = 'Currency converter';
  @Input() rates: Currency[] = [];

  theForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.theForm = this.fb.group({
      firstGroup: this.fb.group({
        inputValue: [],
        selectValue: ['USD']
      }),
      secondGroup: this.fb.group({
        inputValue: [],
        selectValue: ['UAH']
      })
    });
  }

  onChange(e: any) {
    const inputFirstValue: number = this.theForm.value['firstGroup']['inputValue'],
    inputSecondValue: number = this.theForm.value['secondGroup']['inputValue'],
    selectFirstValue: string = this.theForm.value['firstGroup']['selectValue'],
    selectSecondValue: string = this.theForm.value['secondGroup']['selectValue'];

    let theCurrency: Currency[] = [];

    let activeGroup!: string,
      fromValue!: number,
      fromCurrency!: string,
      // toValue!: number,
      toCurrency!: string,
      normalOrder: boolean = true,
      thisRate: number = 1;

    if (e.target.classList.contains('firstGroup')) {
      activeGroup = 'firstGroup';
      fromValue = inputFirstValue;
      fromCurrency = selectFirstValue;
      toCurrency = selectSecondValue
    } else if (e.target.classList.contains('secondGroup')) {
      activeGroup = 'secondGroup';
      fromValue = inputSecondValue;
      fromCurrency = selectSecondValue;
      toCurrency = selectFirstValue
    }

    normalOrder = fromCurrency === 'UAH' ? false : true;

    if (normalOrder === true) {
      theCurrency = this.rates.filter((item: Currency) => (item['cc'] === fromCurrency));
      thisRate = theCurrency[0]['rate'];
    } else if (normalOrder === false) {
      theCurrency = this.rates.filter((item: Currency) => (item['cc'] === toCurrency));
      thisRate = 1 / theCurrency[0]['rate'];
    }
 
    // console.log('from: ', fromValue, fromCurrency, 'to: ', toCurrency, fromValue * thisRate);

    // console.log(normalOrder, activeGroup, 'from: ', fromValue, fromCurrency, 'to: ', toCurrency, 'rate: ', thisRate);

    if (e.target.classList.contains('firstGroup')) {      
      this.theForm.patchValue({
        secondGroup: { inputValue:  (fromValue * thisRate).toFixed(2)}});
    } else if (e.target.classList.contains('secondGroup')) {    
        this.theForm.patchValue({
          firstGroup: { inputValue:  (fromValue * thisRate).toFixed(2)}});
    }

    // console.log(this.theForm.value);
  }

}

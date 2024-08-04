import { Component, Input, OnInit} from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

import { Currency } from '../currency';
import { GroupComponent } from './group/group.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, GroupComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
})

export class WidgetComponent implements OnInit {

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
  ngOnInit(): void {
    this.theForm.controls["firstGroup"].valueChanges.subscribe((firstGroupVal) => {
      this.updateSecondGroup(firstGroupVal);
    });
  
    this.theForm.controls["secondGroup"].valueChanges.subscribe((secondGroupVal) => {
      this.updateFirstGroup(secondGroupVal);
    });
  }
  
  private updateSecondGroup(firstGroupVal: any): void {
    const { selectValue, inputValue } = firstGroupVal;
    const rate = this.getRate(selectValue, 'secondGroup');
    
    this.theForm.patchValue({
      secondGroup: { inputValue: (inputValue * rate).toFixed(1) }
    }, { emitEvent: false, onlySelf: true });
  }
  
  private updateFirstGroup(secondGroupVal: any): void {
    const { selectValue, inputValue } = secondGroupVal;
    const rate = this.getRate(selectValue, 'firstGroup');
    
    this.theForm.patchValue({
      firstGroup: { inputValue: (inputValue * rate).toFixed(1) }
    }, { emitEvent: false, onlySelf: true });
  }
  
  private getRate(selectedCurrency: string, targetGroup: 'firstGroup' | 'secondGroup'): number {
    let rateEntry;
    if (selectedCurrency === 'UAH') {
      let otherCurrency: string = this.theForm.value[targetGroup]['selectValue'];
      rateEntry = this.rates.find((item: Currency) => item['cc'] === otherCurrency);
      return rateEntry ? 1 / rateEntry['rate'] : 1;
    } else {
      rateEntry = this.rates.find((item: Currency) => item['cc'] === selectedCurrency);
      return rateEntry ? rateEntry['rate'] : 1;
    }
  }
}
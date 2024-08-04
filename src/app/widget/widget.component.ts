import { Component, Input, OnInit} from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

import { Currency } from '../currency';
import { GroupComponent } from './group/group.component';
import { tap } from 'rxjs';

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
    let theCurrency: Currency[] = [];

    let normalOrder: boolean = true,
    thisRate: number = 1;
    
    this.theForm.controls["firstGroup"].valueChanges.subscribe((val) => {
      // console.log(this.theForm.value);
      if (val['selectValue'] === 'UAH') {
        normalOrder = false;

        theCurrency = this.rates.filter((item: Currency) => (item['cc'] === this.theForm.value['secondGroup']['selectValue']));
        thisRate = 1 / theCurrency[0]['rate'];           
      } else {
        theCurrency = this.rates.filter((item: Currency) => (item['cc'] === val['selectValue']));
        thisRate = theCurrency[0]['rate'];
      }

      this.theForm.patchValue({
        secondGroup: { inputValue:  (val['inputValue'] * thisRate).toFixed(2)}
      }, {emitEvent: false, onlySelf: true});   
    })

    this.theForm.controls["secondGroup"].valueChanges.subscribe((val) => { 
      if (val['selectValue'] === 'UAH') {
        normalOrder = false;

        theCurrency = this.rates.filter((item: Currency) => (item['cc'] === this.theForm.value['firstGroup']['selectValue']));
        thisRate = 1 / theCurrency[0]['rate'];           
      } else {
        theCurrency = this.rates.filter((item: Currency) => (item['cc'] === val['selectValue']));
        thisRate = theCurrency[0]['rate'];
      }

      this.theForm.patchValue({
        firstGroup: { inputValue:  (val['inputValue'] * thisRate).toFixed(2)}
      }, {emitEvent: false, onlySelf: true});  
    })
  }
}

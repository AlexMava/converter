import { Component, Input, OnInit} from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

import { Currency } from '../currency';
import { GroupComponent } from './group/group.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, GroupComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent implements OnInit {
  title: string = 'Currency converter';
  @Input() rates: Currency[] = [];

  theForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.theForm = this.fb.group({
      firstGroup: this.fb.group({
        inputValue: [],
        selectValue: []
      }),
      secondGroup: this.fb.group({
        inputValue: [],
        selectValue: []
      })
    });
  }
  onChange(e: any) {
    const inputFirstValue: number = this.theForm.value['firstGroup']['inputValue'],
    inputSecondValue: number = this.theForm.value['secondGroup']['inputValue'],
    selectFirstValue: string = this.theForm.value['firstGroup']['selectValue'],
    selectSecondValue: string = this.theForm.value['secondGroup']['selectValue'];

    let theCurrency: Currency[] = [];

    if (e.target.classList.contains('firstGroup')) {
      theCurrency = this.rates.filter((item: Currency) => (item['cc'] === selectFirstValue));
      this.theForm.patchValue({
        secondGroup: { inputValue:  inputFirstValue * theCurrency[0]['rate']}});
    } else if (e.target.classList.contains('secondGroup')) {
      theCurrency = this.rates.filter((item: Currency) => (item['cc'] === selectSecondValue))

        this.theForm.patchValue({
          firstGroup: { inputValue:  inputSecondValue * theCurrency[0]['rate']}});
    }
  }
}

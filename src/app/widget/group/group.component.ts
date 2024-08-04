import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormGroupDirective, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from '@angular/forms';

import { Currency } from '../../currency';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupComponent),
      multi: true
    }
  ]
})
export class GroupComponent implements ControlValueAccessor {
  form!: FormGroup;
  
  @Input() formGroupName!: string;
  @Input() rates: Currency[] = [];
  @Input() theForm!: FormGroup;

  inputControl = new FormControl();
  onChange: any = () => {}
  onTouch: any = () => {}

  constructor(private rootFormGroup: FormGroupDirective) {}

  writeValue(){}
  registerOnChange(){}
  registerOnTouched(){}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;

    this.inputControl.valueChanges.subscribe((val) => {
      if (this.onChange){
        // console.log('inputControl')
        // this.onChange(val)
      }
    })
  }
}
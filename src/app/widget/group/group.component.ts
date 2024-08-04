import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormGroup, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';

import { Currency } from '../../currency';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css',
})
export class GroupComponent implements OnInit {
  form!: FormGroup;
  
  @Input() formGroupName!: string;
  @Input() rates: Currency[] = [];

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
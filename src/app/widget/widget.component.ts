import { Component, Input,  OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  @Input() rates: any;

  inputTwoValue: number = 0;

  onChange(e: any) {
    this.inputTwoValue = e.target.value * 41;
    // It's hardcoded now, but need to get rate value from parent object
  }
}

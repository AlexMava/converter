import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Currency } from '../currency';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  title = 'Logo goes here';

  @Input() rates = [];
}

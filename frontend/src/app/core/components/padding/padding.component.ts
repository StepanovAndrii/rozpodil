import { CommonModule } from '@angular/common';
import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-padding',
  imports: [CommonModule],
  templateUrl: './padding.component.html',
  styleUrl: './padding.component.scss'
})

export class PaddingComponent {
  @Input() padding: number = 10;
}

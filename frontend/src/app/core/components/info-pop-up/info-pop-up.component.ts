import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-pop-up',
  imports: [],
  templateUrl: './info-pop-up.component.html',
  styleUrl: './info-pop-up.component.scss'
})
export class InfoPopUpComponent {
  @Input() data: string | null = '';
}

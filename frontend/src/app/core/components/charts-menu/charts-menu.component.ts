import { Component } from '@angular/core';
import { DoughnutChartComponent } from "../charts/doughnut-chart/doughnut-chart.component";

@Component({
  selector: 'app-charts-menu',
  imports: [DoughnutChartComponent],
  templateUrl: './charts-menu.component.html',
  styleUrl: './charts-menu.component.scss'
})
export class ChartsMenuComponent {

}

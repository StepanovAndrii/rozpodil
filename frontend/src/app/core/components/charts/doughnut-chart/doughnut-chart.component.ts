import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Chart, DoughnutController, ArcElement, Tooltip, Legend, Title} from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

@Component({
  selector: 'app-doughnut-chart',
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})

export class DoughnutChartComponent implements AfterViewInit{
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef | undefined;
  doughnutChart: any;

  ngAfterViewInit(): void {
    this.doughnutChartMethod();
  }

  public doughnutChartMethod(): void {
    this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Твій друг', 'Твій друг 2', 'Твій друг 3', 'Не друг', ],
        datasets: [
          {
            label: 'Глобальний внесок',
            data: [1000, 1, 2, 53],
            backgroundColor: [
              'rgba(245, 40, 145, 0.4)',
              'rgba(0, 255, 255, 0.4)',
              'rgba(0, 255, 0, 0.4)',
              'rgba(0, 0, 0, 0.4)'
            ],
            hoverBackgroundColor: [
              'rgba(245, 40, 145, 1)',
              'rgba(0, 255, 255, 1)',
              'rgba(0, 255, 0, 1)',
              'rgba(0, 0, 0, 1)'
            ]
          }
        ]
      }
    });
  }
}

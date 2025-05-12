import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UUID } from 'crypto';
import { TaskStatisticsComplete } from '../../types/interfaces/charts/doughnut/task-statistics-complete.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-charts',
  imports: [CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent implements OnInit, AfterViewInit{
  @ViewChild('doughnutCanvas') public doughnutCanvas: ElementRef | undefined;
  public areChartsVisible = input.required<boolean>();
  public handleAreChartsVisible = output<boolean>();
  public doughnutChart: any;
  private _roomId: UUID | null = null;
  private _doughnutChartData: TaskStatisticsComplete | null = null;
  
  public constructor (
    private _http: HttpClient,
    private _route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._roomId = this._route.snapshot.paramMap.get('id') as UUID;
  }

  public ngAfterViewInit(): void {
    this.doughnutChartMethod();
  }

  public openChartView() {
    this.handleAreChartsVisible.emit(!this.areChartsVisible());

    this._http.get<number>(`/api/rooms/${this._roomId}/tasks`);
  }

  private doughnutChartMethod(): void {
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }
  }
}

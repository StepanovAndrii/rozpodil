import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UUID } from 'crypto';
import { TaskStatisticsComplete } from '../../types/interfaces/charts/doughnut/task-statistics-complete.interface';
import { CommonModule } from '@angular/common';
import { ChartButton } from '../../types/chart-button-enum';
import { firstValueFrom } from 'rxjs';
import { DateTime } from 'luxon';
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-charts',
  imports: [CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent implements OnInit, AfterViewInit{
  @ViewChild('taskCompletionChart') public taskCompletionCanvas: ElementRef | undefined;
  @ViewChild('dailyActivityChart') public dailyActivityCanvas: ElementRef | undefined;
  @ViewChild('taskStatusChart') public taskStatusCanvas: ElementRef | undefined;
  @ViewChild('roomProgressChart') public roomProgressCanvas: ElementRef | undefined;
  @ViewChild('timebasedActivityChart') public timebasedActivityCanvas: ElementRef | undefined;

  taskCompletionChart: Chart | null = null;
  dailyActivityChart: Chart | null = null;
  taskStatusChart: Chart | null = null;
  roomProgressChart: Chart | null = null;
  timebasedActivityChart: Chart | null = null;

  public areChartsVisible = input.required<boolean>();
  public handleAreChartsVisible = output<boolean>();
  public doughnutChart: any;
  public _chartButton = ChartButton;
  public selectedChart: ChartButton = ChartButton.TaskCompletion;
  private _roomId: UUID | null = null;
  
  public constructor (
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _renderer: Renderer2,
    private _elementRef: ElementRef<HTMLElement>
  ) { }

  public ngOnInit(): void {
    this._roomId = this._route.snapshot.paramMap.get('id') as UUID;
  }

  public ngAfterViewInit(): void {
    this.chartsMethod();
  }

  public async openChartView(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.charts__chart-buttons') 
      || target.closest('.charts__chart-diagrams')) {

      return;
    }

    this.registerClickOutside();
    this.handleAreChartsVisible.emit(!this.areChartsVisible());
  }

  public selectChart(chartButtonType: ChartButton) {
    
  }

  private registerClickOutside() {
    const clickListener = this._renderer.listen('document', 'click', (event: Event) => {
      if (!this._elementRef.nativeElement.contains(event.target as Node)) {
        this.handleAreChartsVisible.emit(false);
        clickListener();
      }
    })
  }

  private async chartsMethod(): Promise<void> {
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    switch (this.selectedChart) {
      case ChartButton.TaskCompletion:
        
        break;
      case ChartButton.DailyActivity:
        break;
      case ChartButton.RoomProgress:
        break;
      case ChartButton.TaskStatus:
        break;
      case ChartButton.TimebasedActivity:
        break;
    }
  }
}

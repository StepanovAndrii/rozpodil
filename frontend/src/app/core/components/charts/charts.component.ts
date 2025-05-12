import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UUID } from 'crypto';

@Component({
  selector: 'app-charts',
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent implements OnInit, AfterViewInit{
  @ViewChild('doughnutCanvas') public doughnutCanvas: ElementRef | undefined;
  public doughnutChart: any;
  private _roomId: UUID | null = null;
  private doughnutChartData
  
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


    this._http.get<number>(`/api/rooms/${this._roomId}/tasks`);
  }

  private doughnutChartMethod(): void {
    
  }
}

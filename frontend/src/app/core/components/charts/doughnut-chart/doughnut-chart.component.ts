import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {Chart, DoughnutController, ArcElement, Tooltip, Legend, Title} from 'chart.js'
import { DataService } from '../../../services/data-service/data.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../types/interfaces/user-interface';
import { UUID } from 'crypto';
import { IUsersRoles } from '../../../types/interfaces/users-roles';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

@Component({
  selector: 'app-doughnut-chart',
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})

export class DoughnutChartComponent implements OnInit, AfterViewInit{
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef | undefined;
  doughnutChart: any;
  dataService: DataService = inject(DataService);
  users: IUsersRoles[] = [];
  roomId: UUID | null = null;

  constructor(
    private _route: ActivatedRoute
  ) {
    this.roomId = this._route.snapshot.paramMap.get('id') as UUID;
    
  }
  ngOnInit(): void {
    this.loadUsers();  
  }

  async loadUsers(): Promise<void> {
    this.users = await this.getUsers(); 
    this.doughnutChartMethod();
  }

  async getUsers(): Promise<IUsersRoles[]> {
    if (this.roomId)
      return await this.dataService.getUserRolesByRoomId(this.roomId);
    
    return [];
  }

  ngAfterViewInit(): void {
    this.doughnutChartMethod();
  }

  public doughnutChartMethod(): void {
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.users.map(user => user.username),
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

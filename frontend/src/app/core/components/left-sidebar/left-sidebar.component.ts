import { Component, input, output } from '@angular/core';
import { DoughnutChartComponent } from "../charts/doughnut-chart/doughnut-chart.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-sidebar',
  imports: [DoughnutChartComponent, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  ifLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.ifLeftSidebarCollapsed());
  }
}

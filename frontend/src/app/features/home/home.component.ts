import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks: any;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
        this.tasks = Object.entries(data['taskData']);
    });
    console.log(this.tasks)
  }
}

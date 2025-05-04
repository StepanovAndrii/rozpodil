import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from "../../core/components/dropdown-menu/dropdown-menu.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, DropdownMenuComponent],
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
  }
}

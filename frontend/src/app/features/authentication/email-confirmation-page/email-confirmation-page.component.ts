import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-confirmation-page',
  imports: [],
  templateUrl: './email-confirmation-page.component.html',
  styleUrl: './email-confirmation-page.component.scss'
})
export class EmailConfirmationPageComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('token');
    this.subscription = this.http.post("http://localhost/api/authentication/email-verification", {
      userId: userId,
      token: token
    }).subscribe({
      
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

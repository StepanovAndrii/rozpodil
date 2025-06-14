import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading-service/loading.service';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})

export class LoadingSpinnerComponent{
  public constructor(
    private loadingService: LoadingService
  )
  { }

  
}

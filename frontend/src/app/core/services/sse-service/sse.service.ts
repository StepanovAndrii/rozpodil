import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  private sseSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private eventSource: EventSource | null = null;

  public constructor(
    private zone: NgZone
  ) { }

  public connect(url: string): Observable<any> {
    if (!this.eventSource) {
      this.eventSource = new EventSource(url);
      this.eventSource.onmessage = (event) => {
        this.zone.run(() => {
          this.sseSubject.next(event.data);
        });
      };

      this.eventSource.onerror = (err) => {
        this.zone.run(() => {
          this.sseSubject.error(err);
        });
      };
    }

    return this.sseSubject.asObservable();
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

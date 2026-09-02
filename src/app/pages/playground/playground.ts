import { Component, inject, OnInit } from '@angular/core';
import { LoadingIndicatorService } from '../../shared/components/loading-indicator/loading-indicator.service';

@Component({
  imports: [],
  selector: 'app-playground',
  styleUrl: './playground.css',
  templateUrl: './playground.html',
})
export class Playground implements OnInit {
  loadingService = inject(LoadingIndicatorService)


  ngOnInit(): void {
      this.loadingService.showPopup();
      setTimeout(() => {
         this.loadingService.hidePopup();
       }, 1000);

  }
}

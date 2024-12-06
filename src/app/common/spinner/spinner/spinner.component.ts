import { Component, inject } from '@angular/core';
// import { SpinnerService } from '../spinner.services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  // private readonly spinnerSvc = inject(SpinnerService);
  // isLoading = this.spinnerSvc.isLoading;
  public spinnerShow: boolean = false;
}

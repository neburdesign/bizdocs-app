import { Component } from '@angular/core';
import { ApprovalsComponent } from './features/approvals/approvals.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ApprovalsComponent],
  template: '<app-approvals />'
})
export class AppComponent {}
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { RouterModule } from '@angular/router'; // Import RouterModule


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,  // This remains a standalone component
  imports: [
    RouterModule, // Import RouterModule for router-outlet
    UserRegistrationFormComponent,  // Import standalone components here
    UserLoginFormComponent,
  ],
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '300px',
    });
  }
}
// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Import to close the dialog
import { FetchApiDataService } from '../fetch-api-data.service'; // Import API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // Import to show notifications
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  // Function for sending the login data to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      // Logic for successful login goes here
      localStorage.setItem('token', result.token); // Store token in localStorage
      localStorage.setItem('user', JSON.stringify(result.user)); // Store user data
      this.dialogRef.close(); // Close the modal on success
      this.snackBar.open('Login successful', 'OK', { duration: 2000 }); // Show success notification
    }, (error) => {
      this.snackBar.open('Login failed', 'OK', { duration: 2000 }); // Show error notification
    });
  }
}

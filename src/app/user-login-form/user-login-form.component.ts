import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Import to close the dialog
import { FetchApiDataService } from '../fetch-api-data.service'; // Import API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // Import to show notifications
import { Router } from '@angular/router';
/**
 * The `UserLoginFormComponent` is responsible for handling user login.
 * It collects user input (username and password) and sends it to the backend to authenticate the user.
 * Feedback is provided to the user via a modal dialog and snack bars.
 */

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  
  /**
   * An object that stores the data input by the user for logging in.
   * 
   * @type {{ Username: string, Password: string }}
   */
  @Input() loginData = { Username: '', Password: '' };

  /**
   * @param fetchApiData - Service for making API calls to authenticate the user.
   * @param dialogRef - Reference to the dialog opened for user login.
   * @param snackBar - Service to show notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized the component.
   */
  ngOnInit(): void { }

  /**
   * Logs in the user by sending the form data to the backend.
   * On success, the user's token and data are saved in `localStorage`, the modal dialog is closed, 
   * and a success message is displayed.
   * On error, an error message is displayed to the user.
   */
  loginUser(): void {
    this.router.navigate(['movies']);
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        // Logic for successful login goes here
        localStorage.setItem('token', result.token); // Store token in localStorage
        localStorage.setItem('user', JSON.stringify(result.user)); // Store user data
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('Login successful', 'OK', { duration: 2000 }); // Show success notification
      },
      (error) => {
        this.snackBar.open('Login failed', 'OK', { duration: 2000 }); // Show error notification
      }
    );
  }
}

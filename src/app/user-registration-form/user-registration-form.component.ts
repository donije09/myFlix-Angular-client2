import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Import to close the dialog
import { FetchApiDataService } from '../fetch-api-data.service'; // Import API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // Import to show notifications

/**
 * The `UserRegistrationFormComponent` is responsible for displaying the user registration form.
 * It communicates with the backend to register new users and provides feedback via a modal and snack bars.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  
  /**
   * An object that stores the data input by the user in the registration form.
   * 
   * @type {{ Username: string, Password: string, Email: string, Birthday: string }}
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @param fetchApiData - Service for making API calls to register the user.
   * @param dialogRef - Reference to the dialog opened for user registration.
   * @param snackBar - Service to show notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized the component.
   */
  ngOnInit(): void { }

  /**
   * Registers a new user by sending the form data to the backend.
   * On success, the modal dialog is closed, and a success message is displayed.
   * On error, an error message is shown to the user.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open(result, 'OK', { duration: 2000 }); // Show success notification
      },
      (result) => {
        this.snackBar.open(result, 'OK', { duration: 2000 }); // Show error notification
      }
    );
  }
}

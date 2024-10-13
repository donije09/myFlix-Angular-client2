import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Ensure this is the path to your AppComponent
import { provideHttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Import other necessary modules if needed

// Enable production mode if necessary
enableProdMode();

// Bootstrap the application using the standalone component
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), provideAnimationsAsync(),
    // Add other providers as necessary
  ],
}).catch(err => console.error(err));

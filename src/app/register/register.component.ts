import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [provideNativeDateAdapter()],
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    dob: new Date(),
    email: '',
    password: '',
    confirmPassword: '',
  };
  auth = inject(Auth);
  snackBar = inject(MatSnackBar);

  async onSubmit(form: any) {
    try {
      if (form.valid) {
        console.log(form.value);
        const userCredential = await createUserWithEmailAndPassword(
          this.auth,
          form.value.email,
          form.value.password
        );
        console.log(userCredential);
        this.snackBar.open(
          `${userCredential.user.email} successfully logged in!`
        );
      }
    } catch (error) {
      const errorCode = (error as any).code;
      const errorMessage = (error as any)?.message;
      console.log(`Something went wrong ${errorCode} - ${errorMessage}`);
      this.snackBar.open(
        `Something went wrong ${errorCode} - ${errorMessage}`, "OK"
      );
    }
  }
}

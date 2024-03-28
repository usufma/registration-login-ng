import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };
  title = 'REGISTER AND LOGIN';

  auth: Auth = inject(Auth);
  snackBar = inject(MatSnackBar);

  async onSubmit(form: any) {
    try {
      if (form.valid) {
        console.log(form.value);
        const userCredential = await signInWithEmailAndPassword(
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
      this.snackBar.open(`Something went wrong ${errorCode} - ${errorMessage}`, "OK");
    }
  }
}

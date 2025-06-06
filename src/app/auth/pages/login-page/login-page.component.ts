import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../components/alert-error/alert-error.component";
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  hasError = signal(false);
  isPosting = signal(false);

  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(){
    if(this.loginForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '' , password = '' } = this.loginForm.value;

    //Para que si el email y la password es válida redirija a la página principal de nuestra app
    // si no son válidos hasError se setea a true.
    this.authService.login(email!, password!).subscribe((isAuthenticated) =>{
      if(isAuthenticated){
        this.router.navigateByUrl('/');
        return;
      }
      this.hasError.set(true);
    });

  }
}


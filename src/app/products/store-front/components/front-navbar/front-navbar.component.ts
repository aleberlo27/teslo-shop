import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {

  authService = inject(AuthService);

}

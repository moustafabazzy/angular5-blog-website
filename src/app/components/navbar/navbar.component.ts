import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
     this.userService.isLoggedIn.subscribe(
      (response : boolean) => {
        this.toggleIsLoggedIn(response);
      });

    this.userService.getIsLoggedIn();
  }

  // Toggle logged in state
  toggleIsLoggedIn(state : boolean) {
    this.isLoggedIn = state;
    console.log('toggle logged in state');
  }

  // Set Login / Logout state
  checkAuthState(): void {
    let loggedInUserId = this.userService.getLoggedInUserId();
    if (loggedInUserId) {
      return;
    }
  }

  // Handle login
  onLogIn() {
    if (!this.userService.getLoggedInUserId()) {
      this.router.navigate(['/']);
      return;
    }
  }

  // Handle logout
  onLogOut() {
    this.userService.setLoggedInUserId('');
    this.router.navigate(['/']);
  }

}

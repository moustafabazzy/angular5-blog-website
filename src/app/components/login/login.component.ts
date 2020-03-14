import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UserService } from '../../services/user/user.service';

// Models
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  Users: User[];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // Fetch all users
    this.fetchAllUsers();

    // Check if user is logged in
    this.checkLoggedInUser();
  }

  // Fetch all users
  fetchAllUsers(): void {
    this.userService.fetchUsers()
      .subscribe(users => this.Users = users);
  }

  // Check logged in user and redirect 
  checkLoggedInUser(): void {
    this.userService.getIsLoggedIn();
    let loggedInUserId = this.userService.getLoggedInUserId();
    if (!loggedInUserId) {
      return;
    }

    this.router.navigate(['/home']);
  }
  

  // Handle login click
  onLogin(): void {
    if (!this.username || '' == this.username) {
      alert('Username is empty');
      return;
    }

    if (!this.password || '' == this.password) {
      alert('Password is empty');
      return;
    }

    for (let user of this.Users) {
      if (user.username == this.username && user.password == this.password) {
        this.userService.setLoggedInUserId(user.id);
        this.userService.getIsLoggedIn();
        this.router.navigate(['/home']);
        return;
      }
    }
    alert('Incorrect Username or Password.\nPlease try again.');
  }

}

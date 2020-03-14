import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UserService } from '../../services/user/user.service';

// Models
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    let loggedInUserId = this.userService.getLoggedInUserId();
    if (!loggedInUserId) {
      return;
    }

    this.loadUser(loggedInUserId);
  }

  // Load User 
  loadUser(id: string): void {
    this.userService.fetchUser(id)
      .subscribe(User => this.user = User);
  }

  // Delete User 
  onDelete(id) {
    if (!id) {
      return;
    }

    this.userService.deleteUser(id).subscribe(
      User => {
        this.userService.setLoggedInUserId('');
        this.userService.getIsLoggedIn();
        this.router.navigate(['/home'])
      });
  }

}

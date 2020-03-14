import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UserService } from '../../services/user/user.service';

// Models
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  user: User;

  ngOnInit() {
    let loggedInUserId = this.userService.getLoggedInUserId();
    if (!loggedInUserId) {
      return;
    }

    // Load User 
    this.loadUser(loggedInUserId);
  }

  // Load User 
  loadUser(id: string): void {
    this.userService.fetchUser(id)
      .subscribe(User => this.user = User);
  }

  // Update User
  onSubmit() {
    console.log(this.user);

    this.userService.updateUser(this.user)
      .subscribe(user => this.router.navigate(['/myprofile']));
  }

}

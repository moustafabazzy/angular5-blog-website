import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UserService } from '../../services/user/user.service';

// Models
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  password: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit() {
  }

  // Add User
  onSubmit() {

    var newUser = {
      name: this.name,
      username: this.username,
      password: this.password
    }

    this.userService.addUser(newUser as User)
      .subscribe( user => {
          this.userService.setLoggedInUserId(user.id);
          this.userService.getIsLoggedIn();
          this.router.navigate(['/myprofile'])
        });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Models
import { User } from '../../models/user';

@Injectable()
export class UserService {

  private usersUrl = 'https://5e6a9df90f70dd001643bf14.mockapi.io/api/v1/users';

  constructor(
    private client: HttpClient
  ) { }

  // Fetch all users
  fetchUsers(): Observable<User[]> {
    return this.client.get<User[]>(this.usersUrl);
  }

}

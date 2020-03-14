import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Models
import { User } from '../../models/user';

@Injectable()
export class UserService {

  private usersUrl = 'https://5e6a9df90f70dd001643bf14.mockapi.io/api/v1/users';

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();

  constructor(
    private client: HttpClient
  ) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
    };
  }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  // Set logged in user id
  setLoggedInUserId(id: number) {
    localStorage.setItem('BlogApp-userId', id.toString());
  }

  // Get logged in user id
  getLoggedInUserId(): string {
    var id = localStorage.getItem('BlogApp-userId');
    return id;
  }

  // Fetch all users
  fetchUsers(): Observable<User[]> {
    return this.client.get<User[]>(this.usersUrl);
  }

  // Fetch user by id 
  fetchUser(id): Observable<User> {
    if (!id) { return }
    return this.client.get<User>(this.usersUrl+'/'+id)
      .pipe(catchError(this.handleError<User>('fetchUser')));
  }

  // Update user 
  updateBlog(user: User): Observable<User> {
    return this.client.put<User>(this.usersUrl+'/'+user.id, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('updateUser')));
  }

  // Delete user 
  deleteUser(id): Observable<User> {
    return this.client.delete<User>(this.usersUrl+'/'+id, this.httpOptions)
      .pipe(catchError(this.handleError<Blog>('deleteUser')));
  }

  //
  getIsLoggedIn(): Observable<boolean> {
    if(this.getLoggedInUserId()) {
      this.isLoggedIn.emit(true);
      return Observable.of(true);
    }
    else {
      this.isLoggedIn.emit(false);
      return Observable.of(false)
    }
  }

}

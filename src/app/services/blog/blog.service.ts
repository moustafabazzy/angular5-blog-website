import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


// Models
import { Blog } from '../../models/blog';
import { Like } from '../../models/like';
import { Comment } from '../../models/comment';

@Injectable()
export class BlogService {

  private blogsUrl = 'https://5e6a9df90f70dd001643bf14.mockapi.io/api/v1/blogs';
  private likesUrl = 'https://5e6a9df90f70dd001643bf14.mockapi.io/api/v1/likes';
  private commentsUrl = 'https://5e6a9df90f70dd001643bf14.mockapi.io/api/v1/comments';

  constructor(private client: HttpClient) { }

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
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Fetch all blogs
  fetchAllBlogs(): Observable<Blog[]> {
    return this.client.get<any>(this.blogsUrl, this.httpOptions)
      .pipe(catchError(this.handleError('fetchAllBlogs')));
  }

  // Fetch blog by id
  fetchBlog(id: number): Observable<Blog> {
    return this.client.get<Blog>(this.blogsUrl+'/'+id, this.httpOptions)
      .pipe(catchError(this.handleError<Blog>('fetchBlog')));
  }

  // Add new blog
  addBlog(blog: any): Observable<Blog> {
    return this.client.post<Blog>(this.blogsUrl, blog, this.httpOptions)
      .pipe(catchError(this.handleError<Blog>('addBlog')));
  }

  // Delete blog
  deleteBlog(id: number): Observable<Blog> {
    return this.client.delete<Blog>(this.blogsUrl+'/'+id, this.httpOptions)
      .pipe(catchError(this.handleError<Blog>('deleteBlog')));
  }

  // Update blog 
  updateBlog(blog: Blog): Observable<Blog> {
    return this.client.put<Blog>(this.blogsUrl+'/'+blog.id, blog, this.httpOptions)
      .pipe(catchError(this.handleError<Blog>('updateBlog')));
  }

  // fetch all likes
  fetchAllLikes(): Observable<any> {
    return this.client.get<any>(this.likesUrl, this.httpOptions)
      .pipe(catchError(this.handleError('fetchAllLikes')));
  }

  // Add blog like
  addBlogLike(like: any): Observable<any> {
    return this.client.post<Like>(this.likesUrl, like, this.httpOptions)
      .pipe(catchError(this.handleError<Blog>('addBlogLike')));
  }

  // Delete blog like
  deleteBlogLike(id: number): Observable<Like> {
    return this.client.delete<Like>(this.likesUrl+'/'+id, this.httpOptions)
      .pipe(catchError(this.handleError<Like>('deleteBlogLike')));
  }

  // fetch all comments 
  fetchAllComments(): Observable<any> {
    return this.client.get<any>(this.commentsUrl, this.httpOptions)
      .pipe(catchError(this.handleError('fetchAllComments')));
  }

  // Add blog comment 
  addBlogComment(comment: any): Observable<any> {
    return this.client.post<Comment>(this.commentsUrl, comment, this.httpOptions)
      .pipe(catchError(this.handleError<Blog>('addBlogComment')));
  }

  // Delete blog comment
  deleteBlogComment(id): Observable<Comment> {
    return this.client.delete<Comment>(this.commentsUrl+'/'+id, this.httpOptions)
      .pipe(catchError(this.handleError<Like>('deleteBlogComment')));
  }

}

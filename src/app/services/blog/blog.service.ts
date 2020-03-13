import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


// Models
import { Blog } from '../../models/blog';

@Injectable()
export class BlogService {

  private blogsUrl = 'https://5e6a9df90f70dd001643bf14.mockapi.io/api/v1/blogs';

  constructor(private client: HttpClient) { }

    // Fetch all blogs
    fetchAllBlogs(): Observable<Blog[]> {
      return this.client.get<Blog[]>(this.blogsUrl);
    }

    // Fetch blog by id
    fetchBlog(id: number): Observable<Blog> {
      return this.client.get<Blog>(this.blogsUrl+'/'+id);
    }

    // Add new blog
    addBlog(blog: Blog): Observable<Blog> {
      return this.client.post<Blog>(this.blogsUrl, blog, {});
    }

    // Delete blog
    deleteBlog(id: number): Observable<Blog> {
      return this.client.delete<Blog>(this.blogsUrl+'/'+id);
    }

}

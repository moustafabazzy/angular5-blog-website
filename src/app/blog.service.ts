import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class BlogService {

  private blogsUrl = 'https://5e6a9df90f70dd001643bf14.mockapi.io/api/v1/blogs';

  Blogs = [
  {
    "id": "1",
    "createdAt": "2020-03-12T15:12:46.496Z",
    "name": "Horacio Wisoky",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/thomasschrijer/128.jpg",
    "userId": 35,
    "blogImage": "blogImage 1",
    "tags": "tags 1",
    "likes": 59,
    "description": "description 1"
  },
  {
    "id": "2",
    "createdAt": "2020-03-12T07:07:26.796Z",
    "name": "Luisa Wisozk",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/matbeedotcom/128.jpg",
    "userId": 5,
    "blogImage": "blogImage 2",
    "tags": "tags 2",
    "likes": 99,
    "description": "description 2"
  },
  {
    "id": "3",
    "createdAt": "2020-03-12T15:37:31.245Z",
    "name": "Khalil Jast",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ariffsetiawan/128.jpg",
    "userId": 27,
    "blogImage": "blogImage 3",
    "tags": "tags 3",
    "likes": 83,
    "description": "description 3"
  },
  {
    "id": "4",
    "createdAt": "2020-03-12T10:21:51.299Z",
    "name": "Lesly Schmitt",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/rickyyean/128.jpg",
    "userId": 5,
    "blogImage": "blogImage 4",
    "tags": "tags 4",
    "likes": 20,
    "description": "description 4"
  }];

  constructor(private http: HttpClient) { }

    getBlogs(): Observable<{}> {
      return this.http.get<{}>(this.blogsUrl);
    }

}

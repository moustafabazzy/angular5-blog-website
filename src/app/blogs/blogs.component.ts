import { Component, OnInit } from '@angular/core';

// Services
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  Blogs = [];

  constructor(private blogService: BlogService) { 
  }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs()
      .subscribe(blogs => this.Blogs = blogs);

  }

}

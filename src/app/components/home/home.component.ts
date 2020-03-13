import { Component, OnInit } from '@angular/core';

// Services
import { BlogService } from '../../services/blog/blog.service';

// Models
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Blogs: Blog[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getBlogs();
  }

  // Fetch all Blogs
  getBlogs(): void {
    this.blogService.fetchAllBlogs()
      .subscribe(blogs => this.Blogs = blogs);
  }

}

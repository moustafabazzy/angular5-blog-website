import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// Services
import { BlogService } from '../../services/blog/blog.service';

// Models
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  Blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router 
  ) { }

  ngOnInit() {
    // Load Blog
    this.loadBlog();
  }

  // Load Blog
  loadBlog(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.fetchBlog(id)
      .subscribe(blog => this.Blog = blog);
  }

  // Delete Blog
  onDelete(id) {
    if (!id) {
      return;
    }

    this.blogService.deleteBlog(id)
      .subscribe(blog => this.router.navigate(['/home']));
  }

}

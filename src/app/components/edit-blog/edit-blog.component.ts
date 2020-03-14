import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { BlogService } from '../../services/blog/blog.service';

// Models
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blog: Blog;
  editorHtml: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {
    // Load Blog
    this.loadBlog();
  }

  // Update User
  onSubmit() {
    // Get Blog Description
    var description = this.editorHtml.replace(/(<([^>]+)>)/ig,"");
    description = description.replace(/&nbsp;/ig,"");
    this.blog.description = description;

    this.blogService.updateBlog(this.blog)
      .subscribe(blog => this.router.navigate(['/blogs/view/'+blog.id]));
  }

  // Load Blog
  loadBlog(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.fetchBlog(id)
      .subscribe(blog => { 
        this.blog = blog;
        this.editorHtml=blog.description
      });
  }

}

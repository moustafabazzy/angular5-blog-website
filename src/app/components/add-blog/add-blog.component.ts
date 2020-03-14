import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { BlogService } from '../../services/blog/blog.service';
import { UserService } from '../../services/user/user.service';

// Models
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  name: string;

  editorHtml: string;
  description: string;
  userId: string;

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    let id = this.userService.getLoggedInUserId();
    if (id) {
      this.userId = id;
    }
  }

  onSubmit() {
    // Get Blog Description
    var description = this.editorHtml.replace(/(<([^>]+)>)/ig,"");
    description = description.replace(/&nbsp;/ig,"");
    this.description = description;

    var newBlog = {
      name: this.name,
      userId: this.userId,
      description: this.description,
    };

    this.blogService.addBlog(newBlog)
      .subscribe(blog => this.router.navigate(['/blogs/view/'+blog.id]));
  }


}

import { Component, OnInit, Input } from '@angular/core';

// Services
import { BlogService } from '../../services/blog/blog.service';
import { UserService } from '../../services/user/user.service';

// Models
import { Blog } from '../../models/blog';
import { Like } from '../../models/like';

@Component({
  selector: 'app-blog-thumbnail',
  templateUrl: './blog-thumbnail.component.html',
  styleUrls: ['./blog-thumbnail.component.css']
})
export class BlogThumbnailComponent implements OnInit {

  @Input('blog') blog: Blog;
  @Input('Likes') Likes: Like;

  loggedInUserId: string;

  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.setLoggedInUserId();
  }

  // Set loggedInUserId
  setLoggedInUserId() {
    var id = this.userService.getLoggedInUserId(); 
    if (id) {
      this.loggedInUserId = id;
    }
  }

  // Like Blog
  likeBlog(userId, blog) {
    var newLike = {
      userId: userId,
      blogId: blog.id
    };

    this.blogService.addBlogLike(newLike).subscribe(like => {
      // Augment Likes 
      this.Likes.push(like);

      // Augment Blog total likes
      blog.likes += 1;
      blog.isLiked = true;
      this.blogService.updateBlog(blog).subscribe(blog => );

    });
  }

  // Unlike Blog
  unlikeBlog(userId, blog) {
    // Find Like id to delete
    var likeId = null;
    for (let like of this.Likes) {
      if (userId == like.userId && blog.id == like.blogId) {
        likeId = like.id;
        break;
      }
    }

    if (!likeId) {
      console.log('Unlike Blog Error: could not find like id');
      return;
    }

    // Delete Like
    this.blogService.deleteBlogLike(likeId).subscribe(like => {

      // Augment Blog total likes
      blog.likes -= 1;
      blog.isLiked = false;
      this.blogService.updateBlog(blog).subscribe(blog =>);

    });
  }

}

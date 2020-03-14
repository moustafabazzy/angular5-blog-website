import { Component, OnInit } from '@angular/core';

// Services
import { BlogService } from '../../services/blog/blog.service';
import { UserService } from '../../services/user/user.service';

// Models
import { Blog } from '../../models/blog';
import { Like } from '../../models/like';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  Blogs: Blog[];
  Likes: Like[];

  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getMyBlogs();
  }

  // Fetch authenticated user Blogs
  getMyBlogs(): void {
    this.blogService.fetchAllBlogs().subscribe(blogs => {
      // Filter Blogs
      var userId = this.userService.getLoggedInUserId();
      var tmp = [];
      for (let blog of blogs) {
        if (userId != blog.userId) {
          continue;
        }
        tmp.push(blog);
      }
        this.Blogs = tmp;
        this.setIsLiked();
        this.setComments();
    });
  }


  // Set blogs' is Liked by authenticated user
  setIsLiked(): void {
    var id = localStorage.getItem('BlogApp-userId');
    if (!id) {
      return;
    }

    this.blogService.fetchAllLikes().subscribe(likes => {
      this.Likes = likes;
      
      for (let blog of this.Blogs) {
        blog.isLiked = false;

        for (let like of likes) {
          if (id == like.userId && blog.id == like.blogId) {
            blog.isLiked = true;
          }
        }
      }
    });
  }

  // Set Blog Comments
  setComments(): void {

    this.blogService.fetchAllComments().subscribe(comments => {
      this.Comments = comments;
      
      for (let blog of this.Blogs) {
        blog.comments = [];

        for (let comment of comments) {
          if (blog.id == comment.blogId) {
            if (blog.comments.length > 2) {
              break;
            }
            blog.comments.push(comment);
          }
        }
      }
    });
  }

}

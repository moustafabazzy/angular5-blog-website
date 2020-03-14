import { Component, OnInit } from '@angular/core';

// Services
import { BlogService } from '../../services/blog/blog.service';
import { UserService } from '../../services/user/user.service';

// Models
import { Blog } from '../../models/blog';
import { Like } from '../../models/like';

@Component({
  selector: 'app-blogs',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Blogs: Blog[];
  Likes: Like[];

  loggedInUserId: string;

  isLiked = false ;

  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getBlogs();

    this.setLoggedInUserId();

  }

  // Set loggedInUserId
  setLoggedInUserId() {
    var id = this.userService.getLoggedInUserId(); 
    if (id) {
      this.loggedInUserId = id;
    }
  }

  // Fetch all Blogs
  getBlogs(): void {
    this.blogService.fetchAllBlogs().subscribe(blogs => {
        this.Blogs = blogs;
        this.setIsLiked();
        this.setComments();
    });
  }

  // Like Blog
  likeBlog(userId, blog) {
    var newLike = {
      userId: userId,
      blogId: blog.id
    };

    this.blogService.addBlogLike(newLike).subscribe(like => {

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

  // Set blogs' is Liked by authenticated user
  setIsLiked(): void {
    var id = localStorage.getItem('BlogApp-userId');

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// Services
import { BlogService } from '../../services/blog/blog.service';
import { UserService } from '../../services/user/user.service';

// Models
import { Blog } from '../../models/blog';
import { Like } from '../../models/like';
import { Component } from '../../models/comment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  Blog: Blog;
  Likes: Like;
  Comments: Comment;
  belongsToUser = false;
  loggedInUserId: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private userService: UserService,
    private router: Router 
  ) { }

  ngOnInit() {
    // Load Blog
    this.loadBlog();

    this.setLoggedInUserId();
  }

  // Set loggedInUserId
  setLoggedInUserId() {
    var id = this.userService.getLoggedInUserId(); 
    if (id) {
      this.loggedInUserId = id;
    }
  }

  // Load Blog
  loadBlog(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.fetchBlog(id).subscribe(blog => {
        this.Blog = blog;
        // Check if blog belongs to logged in user
        this.setBelongsToUser();
        this.setIsLiked();
        this.setComments();
    });
  }

  // Set blog belongs to user
  setBelongsToUser() {
    var userId = this.userService.getLoggedInUserId();
    if (!userId) {
      return;
    }

    if (!this.Blog) {
      return;
    }

    if (this.Blog.userId == userId) {
      this.belongsToUser = true;
    }
  }

  // Set is Liked by authenticated user
  setIsLiked(): void {
    var id = localStorage.getItem('BlogApp-userId');

    if (!this.Blog) {
      return;
    }

    this.blogService.fetchAllLikes().subscribe(likes => {
      this.Likes = likes;
      
      this.Blog.isLiked = false;

      for (let like of likes) {
        if (id == like.userId && this.Blog.id == like.blogId) {
          this.Blog.isLiked = true;
        }
      }
    });
  }

  // Set Blog Comments
  setComments(): void {

    if (!this.Blog) {
      return;
    }

    this.blogService.fetchAllComments().subscribe(comments => {
      this.Comments = comments;
      
      this.Blog.comments = [];

      for (let comment of comments) {
        if (this.Blog.id != comment.blogId) {
          continue;
        }
        this.Blog.comments.push(comment);
      }
    });
  }

  // Like Blog
  likeBlog(userId) {
    var newLike = {
      userId: userId,
      blogId: this.Blog.id
    };

    this.blogService.addBlogLike(newLike).subscribe(like => {

      // Augment Blog total likes
      this.Blog.likes += 1;
      this.Blog.isLiked = true;
      this.blogService.updateBlog(this.Blog).subscribe(blog => );

    });
  }

  // Unlike Blog
  unlikeBlog(userId) {
    // Find Like id to delete
    var likeId = null;
    for (let like of this.Likes) {
      if (userId == like.userId && this.Blog.id == like.blogId) {
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
      this.Blog.likes -= 1;
      this.Blog.isLiked = false;
      this.blogService.updateBlog(this.Blog).subscribe(blog =>);

    });
  }

  // Post Comment
  onPost(comment: string) {
    var newComment = {
      blogId: this.Blog.id,
      comment: comment
    };

    this.blogService.addBlogComment(newComment as Comment).subscribe(comment => {
        this.Blog.comments.push(comment);
    });
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

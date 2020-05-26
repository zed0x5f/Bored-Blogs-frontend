import { Component, Input, OnInit } from "@angular/core";
import { PostDataService } from "src/app/services/post-data.service";
import { Post } from "src/app/models/post";
import { Router, ActivatedRoute } from "@angular/router";
import { PostCommentService } from "src/app/services/post-comment.service";
import { UserService } from "src/app/services/user.service";
import { Comment } from "../../../models/comment";
import { User } from "src/app/models/user";
import { NgForm } from "@angular/forms";

@Component({
  selector: "post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent implements OnInit {
  // Jackie
  // to get one post to show on /post-detail/:id

  post: Post;
  user: User;
  comment: Comment;
  isOpen: boolean;

  constructor(
    private postDataService: PostDataService,
    private postCommentService: PostCommentService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.postDataService.getPost(+param["id"]).subscribe((p) => {
        this.post = p;
        //console.log(t)
        this.getComments(+param["id"]);
      });
    });

    this.userService.getCurrentUser().subscribe((u) => (this.user = u));
    this.userService.refreshUser();
  }

  //opens and closes divs based on the selector
  selector = -1;
  setSelector(value: number) {
    this.selector = value;
  }

  // Jackie
  // to add a comment to a post in post-detail/:id
  comments: Comment[] = []; //those empty brackets are important

  //Jackie
  // Gets the list of comments at bottom of post
  getComments(parentPostId: number): void {
    this.postCommentService
    .getComments(parentPostId)
    .subscribe((c) => {
      console.log(c);
      this.comments = c;
    });
  }

  addComment(newComment: NgForm) {
    console.log(newComment.form.value);
    //console.log(this.user);
    this.postCommentService
      .addComment(this.post.id, newComment.form.value, this.user.token)
      .subscribe(
        (c) => {
          //console.log(c);       
          this.comments=(c);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewDiscussionService } from '../../services/review-discussion.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnChanges, OnInit {
  @Input() book_id: string = '';
  reviewText: string = '';
  reviewMsg:string=""
  rating: number = 5;
  reviewList: any = []
  discussionList:any=[]
  initDissMsg:string=""
  comment:string=""

  constructor(private reviewDiscussionService: ReviewDiscussionService, private _snackBar: MatSnackBar) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book_id'] && !changes['book_id'].firstChange) {
      this.loadReviews();
      this.loadDiscussions();
    }
  }

  ngOnInit(): void {
    //  this.loadReviews()
  }


  loadReviews() {
    if (this.book_id) {
      this.reviewDiscussionService.getReviews(this.book_id).subscribe((data) => {
        // console.log(data);

        if (typeof data === "object" && data !== null) {

          this.reviewList = data.reviews || []

          if(data.msg){
            this.reviewMsg = data.msg || ""
          }
        }
        
        // Update any variables or properties to display the fetched reviews
      });
    }
  }

  loadDiscussions() {
    if (this.book_id) {
      this.reviewDiscussionService.getDiscussions(this.book_id).subscribe((data) => {
        // console.log(data);

        if (typeof data === "object" && data !== null) {

          this.discussionList = data.userComments || []

          if(data.msg){
            this.initDissMsg = data.msg || ""
          }
        }
        
        // Update any variables or properties to display the fetched discussion
      });
    }
  }

  postDiscussions() {
    let body = {
      comment:this.comment
    };
    console.log(this.book_id)
    this.reviewDiscussionService.postDiscussion(this.book_id, body).subscribe((data) =>{
      // console.log(data);
      let message = data.message.toString()
      this.openSnackBar(message, "close")
      this.loadDiscussions()
      this.comment=""
      this.initDissMsg=""
    });
  }



  postReview() {
    let body = {
      rating: this.rating,
      reviewText: this.reviewText
    };
    console.log(this.book_id)
    this.reviewDiscussionService.postReview(this.book_id, body).subscribe((data) =>{
      console.log(data);
      let message = data.msg.toString()
      this.openSnackBar(message, "close")
      this.loadReviews()
      this.reviewText=""
      this.reviewMsg=""
    });
  }

  
  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    });

    snackBarRef.onAction().subscribe(() => {
      // Handle action here if needed
      snackBarRef.dismiss(); // Dismiss the snack bar on action (if desired)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent implements OnInit {

  authorDetails!: any
  authorBooks!: any

  constructor(private route: ActivatedRoute, private authorService: AuthorService, private bookService:BookService) {

    this.route.params.subscribe((params) => {
      const book_id = params['id'];
      this.authorService.getAuthorById(book_id).subscribe((data) => {
        this.authorDetails = data[0]
        console.log(this.authorDetails)
      })
    })
 
    let query={
      category: "",
      authorName: "",
      bookTitle: "",
      searchText:""
    }
    this.bookService.getbookData(query).subscribe((data) => {
      let authorBooks = data.filter((el) => el.author===this.authorDetails?.name)
      this.authorBooks = authorBooks;
      console.log(this.authorBooks)
    })

    
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.css'
})
export class AuthorPageComponent implements OnInit {

  authorList:any=[]
  loading:boolean=false
  skeleton:any=new Array(20).fill(0)

  constructor(private authorService:AuthorService){}

  ngOnInit(): void {
    this.getAuthors()
  }


  getAuthors(){
    this.loading=true
     this.authorService.getAuthors().subscribe((data) => {
      console.log(data);
      this.authorList = data
      this.loading=false
     })
  }
}

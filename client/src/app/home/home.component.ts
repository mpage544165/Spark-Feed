import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../article.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;
  articles: Article[] = [];

  constructor(private articleService: ArticleService, private auth:AuthenticationService) { }

  ngOnInit(): void {
    if (this.auth.getUserDetails()) {
      this.name = this.auth.getUserDetails().name;
    }
    this.getArticle();
  }

  getArticle() {
    this.articleService.getArticle()
      .subscribe((data) => {
        console.log('Data:', data);
        this.articles = data.articles;
      }, (err) => {
        console.error(err);
      });
  }

}

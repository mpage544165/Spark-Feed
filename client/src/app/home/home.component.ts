import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
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

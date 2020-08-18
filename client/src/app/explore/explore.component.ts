import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private articleService:ArticleService) { }

  articles = [];

  ngOnInit(): void {
    this.articleService.getUserArticles()
      .subscribe(data => {
        console.log(data);
      })
  }

}

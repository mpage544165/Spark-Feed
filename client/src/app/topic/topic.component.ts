import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topic: string;
  articles: any;

  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
    this.articleService.topicsDictionary.subscribe(data => {
      console.log(data);
      this.topic = window.location.pathname.toString().split("/").pop();
      this.articles = data[this.topic].articles;
    }) 
  }

  saveToLibrary(index) {
    this.articleService.saveArticle(this.articles[index].url);
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ArticleService } from '../article.service';

interface Dictionary {
  [key: string]: any;
} 

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  topics: any = []

  
  topicsDictionary:Dictionary = {};

  constructor(private auth:AuthenticationService, private articleService:ArticleService) { }

  ngOnInit(): void {
    this.topics = this.auth.getUserDetails().topics;

    for (let i = 0; i < this.topics.length; i++) {
      this.articleService.getArticlesByTopic(this.topics[i])
      .subscribe(data => {
        console.log(data);
        console.log(this.topics);
        this.topicsDictionary[this.topics[i]] = data;
        console.log(this.topicsDictionary[this.topics[i]]); 
        this.articleService.changeTopicsDictinary(this.topics[i], data);
      });
    }
  }



}

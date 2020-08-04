import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ArticleService } from '../article.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http:HttpClient, private auth:AuthenticationService, private articleService:ArticleService) { }

  ngOnInit(): void {
    this.topics = this.auth.getUserDetails().topics;

    for (let i = 0; i < this.topics.length; i++) {
      this.articleService.getArticlesByTopic(this.topics[i])
      .subscribe(data => {
        console.log(data);
        this.topicsDictionary[this.topics[i]] = data;
        console.log(this.topicsDictionary[this.topics[i]]); 
        this.articleService.changeTopicsDictinary(this.topics[i], data);
      });
    }
  }

  addNewTopic(topic): void {
    console.log('adding topic...');
    let token = this.auth.getToken();
    let user = this.auth.getUserDetails();
    user.topics.push(topic);

    this.http.post(`/api/${user._id}/addtopic`, user, { headers: { Authorization: `Bearer ${token}` }})
      .subscribe(res => {
        console.log(res);
      });
  }

}

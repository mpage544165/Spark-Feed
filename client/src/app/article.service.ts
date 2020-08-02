import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export interface Article {
  title: '',
  content: '',
  urlToImage: ''
}

interface Dictionary {
  [key: string]: any;
} 

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleSource = new BehaviorSubject<Dictionary>({});
  topicsDictionary:Dictionary = this.articleSource.asObservable();

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  public getArticle(): Observable<any> {
    let url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=04727d2ac11b4976bccf652ca5f80782';

    return this.http.get(url);
  }

  public getTopics(): Observable<any> {
    
    const user = this.auth.getUserDetails();

    return this.http.get(`api/${user._id}/topics`);
  }

  public getArticlesByTopic(topic) {
    let url = `http://newsapi.org/v2/everything?q=${topic}&` +
              'apiKey=04727d2ac11b4976bccf652ca5f80782';

    return this.http.get(url);
  }

  changeTopicsDictinary(topic: string, data) {
    this.topicsDictionary[topic] = data;
    this.articleSource.next(this.topicsDictionary);
  }
}

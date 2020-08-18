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
    let isoDate = new Date();
    isoDate.setDate(isoDate.getDate() - 31);

    let url = `http://newsapi.org/v2/everything?q=${topic}&` +
              //`from=${isoDate.toISOString()}&to=${isoDate.toISOString()}&sortBy=popularity&` +
              'apiKey=04727d2ac11b4976bccf652ca5f80782';

    return this.http.get(url);
  }

  changeTopicsDictinary(topic: string, data) {
    this.topicsDictionary[topic] = data;
    this.articleSource.next(this.topicsDictionary);
  }

  public saveArticle(url) {
    //get article html
    //this.http.get(url).subscribe(res => {
      const data = {
        url: url
      }
      //post to api with article html as data
      this.http.post('api/articles/save', data, { headers: { Authorization: `Bearer ${this.auth.getToken()}`}})
      .subscribe(res => {
        console.log(res);
      });
    //});
  }

  public getUserArticles() {
    return this.http.get('api/articles', { headers: { Authorization: `Bearer ${this.auth.getToken()}`}});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer } from '../models/developer.model';

@Injectable()
export class GithubService {
  private URL: string = "https://api.github.com/users";

  public getDeveloper(user: string): Observable<any> {
    return this._http.get(`${this.URL}/${user}`)
  }

  public getRepositories(user: string): Observable<any> {
    return this._http.get(`${this.URL}/${user}/repos?`+
                            'sort=updated&' +
                            'per_page=3&' +
                            'page=1');
  }

  public getDeveloperList(): Observable<any> {
    const random: number = Math.floor(Math.random() * 100000) + 1;

    return this._http.get(`${this.URL}?since=${random}`);
  }



  constructor(private _http: HttpClient) {

  }




}

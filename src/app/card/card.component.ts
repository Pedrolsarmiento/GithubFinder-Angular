import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Developer } from '../models/developer.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('change',[
      state('loaded', style({ opacity: 1 })),

      state('loading', style({ opacity: 0 })),

      transition('loaded => loading', [animate(80)]),
      transition('loading => loaded', [animate(1200)])
    ])
  ]
})
export class CardComponent implements OnInit {
  user: string;
  developer: Developer =  new Developer();
  notFound: boolean = false;
  isLoading: boolean = false;
  isLoadingRepo: boolean = false;
  displayedColumns: string[] = ['name','language','desc','link'];

  constructor(private _githubService: GithubService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user = <string>params['user'];
      if (this.user) {
        this.isLoading = true;
        this.isLoadingRepo = true;
        this.actualizarDeveloper();
      }
    });



  }

  private actualizarDeveloper(): void {
    this._githubService.getDeveloper(this.user).subscribe(
      data => {
        this.notFound = false;

        this.developer.name = data.name;
        this.developer.user = data.login;
        this.developer.avatar = data.avatar_url;
        this.developer.bio = data.bio;

        this.isLoading = false;
      },
      err => {
        this.user = '';
        this.notFound = true;
      }
    );

    this._githubService.getRepositories(this.user).subscribe(
      data => {
        this.developer.repositories = data.map(repo => {
          return {
            name: repo.name,
            lang: repo.language,
            desc: repo.description,
            url: repo.html_url
          }
        });
        this.isLoadingRepo = false;
      }
    );
  }

}

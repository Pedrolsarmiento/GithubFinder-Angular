import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  user: string = "";

  constructor(private _githubService: GithubService,
              private route: Router) { }

  ngOnInit(): void {
  }

  public search(e: Event): void {
    if (this.user != '') {
      this.route.navigate([this.user]);
      console.log(this.user);
    }  
  }

}

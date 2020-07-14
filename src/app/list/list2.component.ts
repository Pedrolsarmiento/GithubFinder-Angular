import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  user: string;
  users: Array<any>;

  constructor(private _githubService: GithubService) { }

  ngOnInit(): void {
    this._githubService.getDeveloperList().subscribe(data => {
      this.users = data.map(dev => dev.login).slice(0,11);
      console.log(this.users);
    });
  }

}

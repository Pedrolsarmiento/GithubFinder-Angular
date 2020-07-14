import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  sequence
} from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('changePageAnimation', [

      transition(':increment', [
        sequence([
          animate(400, style({transform: 'translateX(-20px)', opacity: 0})),
          animate(10, style({transform: 'translateX(20px)'})),
          animate(400, style({transform: 'translateX(0)', opacity: 1}))
        ])
      ]),
      transition(':decrement', [
        sequence([
          animate(400, style({transform: 'translateX(20px)', opacity: 0})),
          animate(10, style({transform: 'translateX(-20px)'})),
          animate(400, style({transform: 'translateX(0)', opacity: 1}))
        ])
      ])
    ])
  ]
})
export class ListComponent implements OnInit {
  user: string;
  users: Array<any>;
  usersToShow: Array<any>;
  page: number = 0;

  constructor(private _githubService: GithubService,
              private route: Router) { }

  ngOnInit(): void {
    this.users = new Array(30);

    this._githubService.getDeveloperList().subscribe(data => {
      this.users = data.map(dev => dev.login);
      this.usersToShow = this.users.slice(0,10);
    });
  }

  changeUser(newUser): void {
    if (newUser != '') {
      this.user = newUser;
      this.route.navigate([this.user]);
    }
  }

  changePage(e: PageEvent): void {
    // this.animateChange(e);

    setTimeout(() => {
      if (e.pageIndex == 0) {
        this.usersToShow = this.users.slice(0,10);
      } else {
        const n: number = e.pageIndex * 10;
        this.usersToShow = this.users.slice(n,n+10);
      }
    }, 405);

    this.page = e.pageIndex;




  }

  // animateChange(e: PageEvent): void {
  //   this.page = (e.pageIndex - e.previousPageIndex) > 0 ?
  //                'nextPage' : 'previousPage';
  // }

}

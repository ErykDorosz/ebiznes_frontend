import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../../core/user-state.service';
import { JwtUser } from '../../core/user.model';
import { AdminAction } from '../../core/adminAction.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  user?: JwtUser;
  actions: AdminAction[] = [
    {
      header: 'Add a new category',
      link: '/admin/category/add',
      icon: 'plus-square'
    },
    {
      header: 'Add a new product',
      link: '/admin/product/add',
      icon: 'plus-square'
    }
  ]

  constructor(private userState: UserStateService) { }

  ngOnInit(): void {
    this.userState.currentUser.subscribe(user => {
      this.user = user;
    })
  }

}

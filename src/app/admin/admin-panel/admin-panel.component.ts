import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../../core/user-state.service';
import { JwtUser } from '../../core/user.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  user?: JwtUser;

  constructor(private userState: UserStateService) { }

  ngOnInit(): void {
    this.userState.currentUser.subscribe(user => {
      this.user = user;
    })
  }

}

import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { UserStateService } from './user-state.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private userState: UserStateService) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.userState.currentUser.pipe(
      map(user => {
        return user ? user.admin : false;
      }));
  }


}

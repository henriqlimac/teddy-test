import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { selectUserName } from '../../shared/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.store.select(selectUserName).pipe(
      map((username) => {
        if (username) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}

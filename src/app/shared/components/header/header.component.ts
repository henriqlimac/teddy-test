import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { Observable } from 'rxjs';
import { selectFullUser } from '../../store';
import { IUserState } from '../../store/user.state';
import routes from '../../consts/routes.const';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected user$: Observable<IUserState>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectFullUser);
  }

  public readonly isSidebarOpen = output<void>();
  public readonly MenuIcon = Menu;
  public readonly routes = routes;

  public openSidebar() {
    this.isSidebarOpen.emit();
  }
}

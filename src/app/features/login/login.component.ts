import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createUser, removeUser } from '../../shared/store';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  public name: string = '';

  public ngOnInit(): void {
    this.store.dispatch(removeUser());
  }

  public dispatchUser() {
    this.store.dispatch(createUser({ name: this.name, selected: [] }));
    this.router.navigate(['/customers']);
  }
}

import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';
import routes from '../../consts/routes.const';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public readonly isActive = input<boolean>(false);
  public readonly close = output<void>();
  public readonly routes = routes;

  public readonly arrowLeftIcon = ArrowLeft;

  public onClose() {
    this.close.emit();
  }
}

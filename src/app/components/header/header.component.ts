import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public authUser = false;
  constructor(private localStorageService: LocalStorageService) {
    const token = this.localStorageService.getLocalStorage('token');
    // if (token && token.trim()) {
    //   this.authUser = true;
    //   console.log(this.authUser);
    // }
  }
}

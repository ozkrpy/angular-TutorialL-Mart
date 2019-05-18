import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LemonMart';
  displayAccountsIcons = false;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    iconRegistry.addSvgIcon(
      'store-infrastructure',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/icons/store-infrastructure.svg'
      )
    );
  }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this.displayAccountsIcons = authStatus.isAuthenticated)
    );
  }
}

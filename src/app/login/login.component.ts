import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/role.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailValidations, PasswordValidation } from '../common/validation';
import { UiService } from '../common/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = '';
  redirectUrl;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl')));
  }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidations],
      password: ['', PasswordValidation]
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .subscribe(
        authStatus => {
          if (authStatus.isAuthenticated) {
            this.uiService.showToast(`Bienvenido: ${authStatus.userRole}`);
            //this.router.navigate([this.redirectUrl || '/manager']);
          }
        },
        error => (this.loginError = error)
      );
  }
}

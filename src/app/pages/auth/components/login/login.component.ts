import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuildForm } from '../../../../models/form-builder.type';
import { IAuthForm } from '../../models/auth-form.interface';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loginAction } from '../../../../../store/auth/actions/login.action';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public isFormSubmitting$: Observable<boolean> = of(false);
  public loginForm!: FormGroup<BuildForm<IAuthForm>>;
  public showPassword = false;

  private readonly store  = inject(Store);

  protected togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public ngOnInit(): void {
    this.loginForm = new FormGroup<BuildForm<IAuthForm>>({
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {nonNullable: true, validators: [Validators.required]})
    });
  }

  protected onSubmit(): void {
    const formValue = this.loginForm.getRawValue();
    const { email, password } = formValue;
    const loginRequest: IAuthForm = { email, password };
    this.store.dispatch(loginAction({ loginRequest }));
  }
}

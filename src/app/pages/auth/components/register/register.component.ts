import { Component, inject } from '@angular/core';
import { IRegisterForm, IRegisterFormWithConfirmPassword } from '../../models/auth-form.interface';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BuildForm } from '../../../../models/form-builder.type';
import { AuthService } from '../../../../services/auth.service';
import { compareValidator } from '../../../../utils/compare-passwords.validator';
import { CommonModule } from '@angular/common';
import { checkEmailValidator } from '../../../../utils/check-email.validator';
import { Store } from '@ngrx/store';
import { registerAction } from '../../../../../store/auth/actions/register.action';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  private readonly store = inject(Store);

  ngOnInit(): void {
    this.registerForm = new FormGroup<BuildForm<IRegisterFormWithConfirmPassword>>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
        //asyncValidators: [checkEmailValidator(this.authService)]
      }),
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] }),
      role: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      avatar: new FormControl<File | null>(null, { nonNullable: true, validators: [Validators.required] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
    }, {
      validators: compareValidator('password', 'confirmPassword')
    });
  }

  async uploadImageToImgbb(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('https://api.imgbb.com/1/upload?key=d43878a879bad8c1c99caf56b68d8fb4', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    return data.data.url;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.uploadImageToImgbb(file).then((url: string) => {
        this.registerForm.patchValue({ avatar: url });
      });
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;


    const registerRequest = {
      email: formValue.email,
      name: formValue.name,
      role: formValue.role,
      avatar: formValue.avatar,
      password: formValue.password
    };

    this.store.dispatch(registerAction(registerRequest));
  }
}
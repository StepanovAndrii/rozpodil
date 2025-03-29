import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlPassword: string, matchingControlPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlPassword);
    const matchingControl = formGroup.get(matchingControlPassword);

    if (matchingControl?.errors && !matchingControl.errors['passwordMismatch']) {
      return null;
    }

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  };
}

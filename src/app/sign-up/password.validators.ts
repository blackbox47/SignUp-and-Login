import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

    static passwordShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let repeatPassword = control.get('repeatPassword');
        if (password.value !== repeatPassword.value) {
            return {
                passwordShouldMatch: true
            }
        }
        return null;
    }
}
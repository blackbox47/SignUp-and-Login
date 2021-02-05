import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

export class EmailValidator {

    static emailShouldUnique(db: AngularFireDatabase) {
        let users;
        let rawUsers: string[] = [];
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                db.list('/users').snapshotChanges().pipe(
                    map(changes =>
                        changes.map(a => ({
                            key: a.payload.key, ...a.payload.val() as {}
                        }))))
                    .subscribe(data => {
                        users = data;
                        for (let index in users) {
                            rawUsers.push(users[index].email);
                        }
                        if (rawUsers.includes(control.value)) {
                            resolve({ emailShouldUnique: true })
                        }
                        else resolve(null);
                    })
            })
        }
    }
}
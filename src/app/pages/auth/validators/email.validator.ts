import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidator {

    static shouldBeUnique(control: AbstractControl) : Promise <ValidationErrors | null> {
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                if (control.value === 'hello@123')
            resolve ({ shouldBeUnique: true });
            else 
            resolve(null);
            }, 2000);
            
        });

    }


}
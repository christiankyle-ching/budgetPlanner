import { FormControl } from '@angular/forms';

export class NoWhiteSpaceValidator {

    static validInput(fc: FormControl) {
        
        if (fc.value.trim() == '') {
            return ({
                validInput: true
            });
        } else {
            return (null);
        }
    }

}
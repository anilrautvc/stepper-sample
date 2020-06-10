import { FormControl } from '@angular/forms';
import {ValidatorFn} from '@angular/forms';

export function validateAtLeastOneChecked(control: FormControl) {
  return control.value.includes(true) ? null: {error: true};
}

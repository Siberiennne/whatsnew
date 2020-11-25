import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'email-input-component',
    templateUrl: './email-input.component.html'
})

export class EmailInputComponent {
    
    @Output() emailInputEvent = new EventEmitter<string>();

    inputEmail(value: string) {
        this.emailInputEvent.emit(value);
    }
    
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

}
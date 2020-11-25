import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'name-input-component',
    templateUrl: './name-input.component.html'
})

export class NameInputComponent {
    
    @Output() nameInputEvent = new EventEmitter<string>();

    inputName(value: string) {
        this.nameInputEvent.emit(value);
    }
}
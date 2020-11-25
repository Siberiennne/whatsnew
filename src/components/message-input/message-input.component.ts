import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'message-input-component',
    templateUrl: './message-input.component.html'
})

export class MessageInputComponent {

    @Output() messageInputEvent = new EventEmitter<string>();

    inputMessage(value: string) {
        this.messageInputEvent.emit(value);
    }
}
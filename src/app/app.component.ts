import { TFormData } from '../types/TFormData';
import { TChangelog } from '../types/TChangelog';
import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Whatsup new in Planyway';

  changelog: TChangelog[] = [];
  userName: string = "";
  userEmail: string = "";
  userMessage: string = "";
  formVisibility: boolean = false;

  constructor(private httpService: HttpService) {

  }

  ngOnInit() {
    this.httpService.getChangelog().subscribe((data: TChangelog[]) => {
      this.changelog = data
    });
  }

  showForm() {
    this.formVisibility = true;
  }

  inputEmail(value: string) {
    this.userEmail = value;
  }

  cancelMessage() {
    this.cleanInputs();
    this.formVisibility = false;

  }

  sendMessage() {
    let formData: TFormData = {
      userName: this.userName,
      userEmail: this.userEmail,
      userMessage: this.userMessage
    }

    this.httpService.sendMessage(formData);
  }

  cleanInputs() {
    this.userName = "";
    this.userMessage = "";
    this.inputEmail("");
  }
}

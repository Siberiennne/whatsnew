import { DateFormatter } from './../helper/DateFormatter';
import { TFormData } from '../types/TFormData';
import { TChangelog } from '../types/TChangelog';
import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  formAvailability: boolean = true;

  constructor(private httpService: HttpService, private _snackBar: MatSnackBar, public loader: LoadingBarService) {
  }

  ngOnInit() {
    this.httpService.getChangelog().subscribe((data: TChangelog[]) => {
      data.forEach(value => {
        value.date = DateFormatter.formatDate(value.date);
      })
      this.changelog = data
    });

  }

  cancelMessage() {
    this.cleanInputs();
    this.formVisibility = false;
  }

  sendMessage() {
    this.disableForm();

    let formData: TFormData = {
      userName: this.userName,
      userEmail: this.userEmail,
      userMessage: this.userMessage
    }

    return this.httpService.getResponse().subscribe(responseURL => {
      this.httpService.putUserDataToURL(responseURL, formData).subscribe(
        response => {
          this.makeFormAvailable();
          this.closeForm();
          this.openSnackBar('success')
        },
        err => {
          this.makeFormAvailable();
          this.closeForm();
          this.openSnackBar('error', err)
        });
    });

  }

  openSnackBar(status: 'success' | 'error', error?: string) {
    let message = '';

    if (status == 'success') {
      message = 'Message was successfully sent!';
    }
    else if (status == 'error' && error) {
      message = 'Failed to send message: ' + error;
    }

    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

  inputEmail(value: string) {
    this.userEmail = value;
  }

  inputName(value: string) {
    this.userName = value;
  }

  inputMessage(value: string) {
    this.userMessage = value;
  }

  cleanInputs() {
    this.inputName("");
    this.inputEmail("");
    this.inputMessage("");
  }

  showForm() {
    this.formVisibility = true;
  }

  closeForm() {
    this.formVisibility = false;
  }

  makeFormAvailable() {
    this.formAvailability = true;
  }

  disableForm() {
    this.formAvailability = false;
  }
}
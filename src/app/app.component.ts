import { TFormData } from '../types/TFormData';
import { TChangelog } from '../types/TChangelog';
import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';
import { ProgressAnimationEnd } from '@angular/material/progress-bar';
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

  constructor(private httpService: HttpService, private _snackBar: MatSnackBar, public loader: LoadingBarService) {

    const state = this.loader.useRef();

    state.start();
    state.complete();

    const value$ = state.value$;
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

  loadData(value: ProgressAnimationEnd) {

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

    return this.httpService.getResponse().subscribe(responseURL => {
      this.httpService.putUserDataToURL(responseURL, formData).subscribe(
        response => {
          this.openSnackBar('success')
        },
        err => {
          this.openSnackBar('error', err)
        });
    });

  }

  cleanInputs() {
    this.userName = "";
    this.userMessage = "";
    this.inputEmail("");
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
}
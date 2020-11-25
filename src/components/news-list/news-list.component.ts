import { TChangelog } from './../../types/TChangelog';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'news-list-component',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.css']
})

export class NewsListComponent {
    @Input() changelog: TChangelog[] = [];
}
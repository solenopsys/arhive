import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-icons-page',
  templateUrl: './icons-page.component.html',
  styleUrls: ['./icons-page.component.scss']
})
export class IconsPageComponent implements OnInit {

 // icons: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // firstValueFrom(this.httpClient.get('/assets/icons/index.json')).then(icons => {
    //   this.icons = Object.entries(icons).map((entry: any) => {
    //     return {key: entry[0], title: entry[0]};
    //   });
    // });
  }

}

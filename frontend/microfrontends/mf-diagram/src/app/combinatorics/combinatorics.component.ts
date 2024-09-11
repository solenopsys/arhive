import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {DiagramConfig} from "../system-diagram/system-diagram.component";

@Component({
  selector: 'combinatorics',
  templateUrl: './combinatorics.component.html',
  styleUrls: ['./combinatorics.component.css']
})
export class CombinatoricsComponent implements OnInit{

  $conf:Observable<DiagramConfig>;
  url:string;

  constructor(private http:HttpClient,private ar: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.url = this.ar.snapshot.data['url'];
    console.log("URL",this.ar.snapshot.data)

    this.$conf=this.http.get<DiagramConfig>(this.url);

  }


}

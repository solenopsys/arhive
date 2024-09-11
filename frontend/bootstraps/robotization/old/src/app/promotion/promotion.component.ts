import { Component } from '@angular/core';
import {MyService} from "../service";

@Component({
  selector: 'promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {

  constructor(protected ms:MyService) {
  }

}

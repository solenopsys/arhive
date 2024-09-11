import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleVersion} from "@solenopsys/fl-content";


@Component({
  selector: 'app-fragment-editor',
  templateUrl: './fragment-editor-panel.component.html',
  styleUrls: ['./fragment-editor-panel.component.scss']
})
export class FragmentEditorPanelComponent implements OnInit {

  value!: ArticleVersion;
  public fragmentId!:string;



  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.fragmentId = params.id;
    });
  }
}

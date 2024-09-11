import {Component, Input, OnInit} from '@angular/core';
import {PlanUiService} from '../services/plan-ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GoalState} from '../stores/goals.store';
import {Store} from '@ngxs/store';
import {Observable} from "rxjs";
import {Direction,  ItemLink, ItemType} from "@solenopsys/ui-controls";
import {LinkState} from "../stores/links.store";
import {AddDraftLink, Link} from "../stores/link.model";
import {FreeProvider} from "@solenopsys/ui-controls";


const NEW = 'new';

@Component({
  selector: 'app-plan-links-group',
  templateUrl: './plan-links-group.component.html',
  styleUrls: ['./plan-links-group.component.scss']
})
export class PlanLinksGroupComponent implements OnInit {

  @Input()
  title!: string;

  linkedId!: string;

  @Input()
  direction!: Direction;

  @Input()
  type!: ItemType;
  items$!: Observable<any>;

  goalId!: string;
  showNew = false;
  edit!: boolean;

  @Input()
  provider!: FreeProvider;


  constructor(private planUi: PlanUiService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    this.goalId = this.store.selectSnapshot(GoalState.getGoalId);


    /* this.subject.pipe(startWith(null), pairwise()).subscribe(([previousValue, currentValue]) => {
         this.planUi.changeLink(this.ioType, this.value.id, currentValue, previousValue);
     });*/
  }

  @Input('linkedId')
  set setLinkedId(linkedId: string) {
    this.linkedId = linkedId;
    console.log('LINKED ID', this.linkedId);
    this.items$ = this.store.select(
      this.direction === Direction.in ?
        LinkState.getByToId(this.linkedId) :
        LinkState.getByFromId(this.linkedId)
    );
  }

  remove(index: number) {
    /*  this.value[this.ioType]?.splice(index, 1);
      console.log('REMOVE');*/
  }

  add() {
    const link = new Link();
    link.count = 1;
    link.toId = this.direction === Direction.in ? this.linkedId : NEW;
    link.fromId = this.direction === Direction.out ? this.linkedId : NEW;
    this.store.dispatch(new AddDraftLink(link));
    /*
    const pl = {id: undefined, count: 1};
    this.value[this.ioType]?.push(pl);
    this.saveAfterCreate();*/
  }


  changeValue(newValue: ItemLink) {/*
        this.subject.next(newValue);*/
  }

  linkSelect($event: string) {

  }

  newItem($event: string) {

  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {HideComponent, MenuLoaderProvider, MenuLoaderService} from "@solenopsys/ui-templates";
import {Store} from "@ngxs/store";
import {GroupService} from "@solenopsys/ui-publications";
import {MenuItemData} from "@solenopsys/ui-navigate";


type Stage = {
    name: string,
    id:string,
    target?: string
    modules?: { name:string }[]
}

class StagesProvider implements MenuLoaderProvider {

    constructor(public $stages: Observable<Stage[]>) {
    }


    load(dataKey: string): Promise<MenuItemData[]> {
        return new Promise((resolve) => {
            this.$stages.subscribe(stages => {
                let source: MenuItemData[] = stages.map<MenuItemData>(stage => {
                    return {name: stage.name, link: "/stages#"+stage.id}
                });
                resolve(source);
            })
        });
    }

}

@Component({
    selector: 'stages',
    templateUrl: './stages.component.html',
    styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit,OnDestroy{
    $stages: Observable<Stage[]>;

    constructor(private http: HttpClient,
                private ar: ActivatedRoute,
                private store: Store,
                private groupService: GroupService,
                private mls: MenuLoaderService) {
    }

    ngOnInit(): void {
        this.$stages= this.http.get<Stage[]>(this.ar.snapshot.data['url']);

        const dataKey = "test_data"; // todo remove hardcode

        this.mls.addProvider("stages_provider", new StagesProvider(this.$stages));

        this.mls.addMapping(dataKey, "stages_provider");
 //       this.store.dispatch(new DataLoadRequest("left_menu", dataKey));
    }

    ngOnDestroy(): void {
        this.store.dispatch(new HideComponent("left_menu"));
    }

}

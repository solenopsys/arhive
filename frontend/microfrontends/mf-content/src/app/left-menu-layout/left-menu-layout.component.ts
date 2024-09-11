import {Component, OnInit, ViewEncapsulation} from "@angular/core";

import {GroupService} from "@solenopsys/ui-publications";
import {ActivatedRoute} from "@angular/router";
import {AddProvider, AddProviderMapping, DataLoadRequest} from "@solenopsys/ui-templates";
import {Store} from "@ngxs/store";
import {IpfsMenuLoadProvider} from "../menu-load.provider";

@Component({
    selector: "sc-left-menu-layout",
    templateUrl: "./left-menu-layout.component.html",
    styleUrls: ["./left-menu-layout.component.scss"],
    encapsulation: ViewEncapsulation.Emulated
})
export class LeftMenuLayoutComponent implements OnInit {
    mobileMenu = false;


    constructor(private store: Store, private ar: ActivatedRoute, private groupService: GroupService) {
    }

    ngOnInit(): void {
        const dataKey = this.ar.snapshot.data['ipfs'];
        this.store.dispatch(new AddProvider("content_provider", new IpfsMenuLoadProvider(this.groupService)))
        this.store.dispatch(new AddProviderMapping(dataKey, "content_provider"))


        setTimeout(
            () => {
                this.store.dispatch(new DataLoadRequest("left_menu", dataKey));
            }, 0
        )
    }


}

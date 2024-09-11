import {Component, OnInit} from '@angular/core';
import {RomService} from "../services/rom.service";

@Component({
    selector: 'app-running-page',
    templateUrl: './running-page.component.html',
    styleUrls: ['./running-page.component.scss']
})
export class RunningPageComponent implements OnInit {

    processes;
    active;
    ended;

    constructor(private romServ: RomService) {
    }

    refresh() {
        this.romServ.findProcesses().then(res => {
            this.processes = res.processes;
        });

        this.romServ.findActiveProcesses().then(res => {
            this.active = res.processes;
        });

        this.romServ.findEndedProcesses().then(res => {
            this.ended = res.processes;
        });
    }

    ngOnInit(): void {
        this.refresh();
    }

    start(uid: string, description: string) {
        this.romServ.createExecution(uid, description).then(res => {
            this.refresh();
        });
    }

    end(uid: string) {
        this.romServ.finaliseExecution(uid).then(res2 => {
            this.refresh();
        });

        this.romServ.findOutResources(uid).then(resources => {
            this.romServ.createObjects(resources, '0x24a13'); // todo убрать хардкод
        });

    }
}

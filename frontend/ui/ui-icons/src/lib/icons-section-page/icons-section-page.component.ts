import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-icons-section-page',
    templateUrl: './icons-section-page.component.html',
    styleUrls: ['./icons-section-page.component.scss']
})
export class IconsSectionPageComponent implements OnInit {

    iconsGroups!: { value: string; label: string; }
    section!: string ;

    constructor(private route: ActivatedRoute, private httpClient: HttpClient) {

    }

    ngOnInit(): void {
        this.route.params.subscribe((nav:any)=>{
            this.loadGroups( nav.section)
        })

    }

    async loadGroups(section:string) {
        const file = `/assets/icons/${section}/index.json`;
        this.iconsGroups = await firstValueFrom(this.httpClient.get<{ value: string; label: string; }>(file));
    }

}

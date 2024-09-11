import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {firstValueFrom} from 'rxjs';

const injectPrefix = (items: any[], prefix: string): any[] => {
    items.forEach((val: any) => {
        val.icon = prefix + val.icon
        if (val.items)
            injectPrefix(val.items, prefix);
    });
    return items;
}

@Injectable({
    providedIn: 'root'
})
export class ModulesService {

    constructor(private http: HttpClient) {
    }


    loadModules(host: string): Promise<string[]> {
        let modules = this.http.get(`${host}/fm/list`);
        return firstValueFrom(modules.pipe(map((z: any) => {
                return z.map((x: any) => x.name)
            })
        ));
    }

    loadModuleMenu(name: string): Promise<any> {
        return firstValueFrom(this.http.get<any[]>(`/fm/modules/${name}/assets/menu.json`)
            .pipe(map((data: any[]) => injectPrefix(data, "/fm/modules/" + name))))
    }

    loadModuleMenuDevelop(modulePrefix: boolean): Promise<any> { //todo remove this
        return firstValueFrom(this.http.get<any[]>(`/assets/menu.json`)
            .pipe(map((data: any[]) => modulePrefix ? injectPrefix(data, "/fm/modules/" + name) : data)))
    }
}

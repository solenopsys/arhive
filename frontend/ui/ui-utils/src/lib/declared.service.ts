import {Injectable} from '@angular/core';
import {filter, firstValueFrom, map, Observable, Subject, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeclaredService {
    private components: { [module: string]: { [componentName: string]: any } };
    addEvents: Subject<string> = new Subject<string>();

    constructor() {
        this.components = {};
    }


    getComponent(module: string, componentName: string): Promise<any> {
        if (module in this.components) {

            const comp= this.components[module][componentName]
            console.log("GET COMP11",comp)
            return Promise.resolve(comp)
        } else {
            console.log("GET COMP1")
           return  firstValueFrom(this.addEvents.asObservable().pipe(tap(item=>console.log("ITEMS LAD",item))).pipe(filter(name => name == module))
                .pipe(map(n=>this.components[module][componentName]))
               .pipe(tap(item=>console.log("COMP LAD",item))))
        }
    }

    addComps(module: string, list: any[]) {
      //  console.log("ADD COMP")
        this.components[module] = {}
        for (const comp of list) {
            this.components[module][comp.name] = comp;
        }
        this.addEvents.next(module);
    }
}

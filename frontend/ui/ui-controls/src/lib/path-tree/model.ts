
import {Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {FreeProvider, IdTitle} from "../model";


export enum Direction {
    in = 'in',
    out = 'out'
}

export enum ItemType {
    process = 'process',
    resource = 'resource'
}


export type ItemLink ={
    id: string;
    count: number;
}

export type ItemAbstract = {
    id: string;
    title: string;
    goals?: string[];
    in?: ItemLink[];
    out?: ItemLink[];
}


export type ProcessData =  {
    term?: number;
} & ItemAbstract

export type ResourceData =  {
    x?: number;
} & ItemAbstract


export class FilterObservableProvider implements FreeProvider {

    constructor(private resourcesAll$: Observable<ResourceData[]>) {
    }

    initFilterSelector(str: Observable<string>): Observable<IdTitle[]> {
        return str.pipe(withLatestFrom(this.resourcesAll$)).pipe(map(([query, items]) => {
            return items.filter(item => {
                return query === '' || item.title.indexOf(query) >= 0;
            });
        }));
    }
}




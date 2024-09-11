import {Observable, Subject} from "rxjs";

export type IdTitle = {
    title: string;
    id: string;
}


export type ActionButton = {
    key: string;
    title: string;
    icon: string;
}


export class FilterCachedProvider implements FreeProvider {
    private transformedArray!: IdTitle[];

    constructor(private transformFunction: () => any) {
    }

    setData(dataArray: any[]) {
        this.transformedArray = dataArray.map(this.transformFunction);
    }

    initFilterSelector(str: Observable<string>): Observable<IdTitle[]> {
        const sub = new Subject<IdTitle[]>();
        str.pipe().subscribe(query => {
            sub.next(this.transformedArray.filter((s) => {
                return query === '' || s.title.indexOf(query) >= 0;
            }));
        });
        return sub.asObservable();
    }
}

export interface FreeProvider {
    initFilterSelector(str: Observable<string>): Observable<IdTitle[]>;
}
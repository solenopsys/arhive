import {Injectable} from "@angular/core";

@Injectable(
    {providedIn: 'root'}
)
export class IdService {
    i = 0;

    constructor() {
    }

    getNextId(): string {
        this.i++;
        return this.i + "";
    }

    getRandId(): string {
        return crypto.randomUUID();
    }
}

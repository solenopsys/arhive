import {Injectable} from "@angular/core";



@Injectable({
    providedIn: 'root', // This makes the service available at the root level (singleton)
})
export class MyService {
    getName(): string {
        return "bla"
    }


}
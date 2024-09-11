import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {LoaderService} from "./loader.service";

@Component({
    selector: 'dev-page',
    template: 'ok 10',
})
export class DevPageComponent {
  //  fragmentId="bafyreihktsiuiszlzp2rlwk7ju5ndn6hajflpd44so7z6byni5ys4hosn4"
    nodeId="bafyreiep4rsu7ffoj5hyvvknbil3jmnk5wygxuepxyo5tqh5o3eh3asrlu"

    constructor(private ls: LoaderService){
        ls.loadNode(this.nodeId).subscribe(
            (response) => {
                console.log("RESPONSE", response)
            });

    }

}
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Uid} from "./store/model";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class LoaderService{
    constructor(private http: HttpClient) {
    }

    loadNode(nodeUid: Uid){
        return  this.http.get(`/ipfs/${nodeUid}?format=dag-json`)
    }

}
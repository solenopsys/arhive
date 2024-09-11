import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Fragment} from "./model";


export interface ContentServiceIntf {
    // loadBlocks(version: string): Promise<Fragment>;

    loadFragment(fragmentId: string): Observable<Fragment>;

    // loadFragmentConf(fragmentId: string): Observable<>;
    //
    // loadFragments(): Promise<any>;
    //
    // newTextVersion(a: ArticleVersion): Promise<any>;
}



@Injectable({
    providedIn: 'root'
})
export class IpfsContentService implements ContentServiceIntf {

    constructor(private http: HttpClient) {

    }

    // loadBlocks(version: string): Promise<VersionResp> {
    //     console.log("REQUEST loadBlocks" )
    //     return Promise.resolve(undefined);
    // }

    loadFragment(fragmentId: string): Observable<Fragment> {
        console.log("REQUEST loadFragment" )

        return  this.http.get<Fragment>(`/ipfs/${fragmentId}?format=dag-json`).pipe(tap(
            (response) => {
                console.log("RESPONSE", response)
            }
        ));
    }

    // loadFragmentConf(fragmentId: string): Observable<Fragment> {
    //     console.log("REQUEST loadFragment" )
    //     return undefined;
    // }
    //
    // loadFragments(): Promise<any> {
    //     console.log("REQUEST loadFragment" )
    //     return Promise.resolve(undefined);
    // }
    //
    // newTextVersion(a: ArticleVersion): Promise<any> {
    //     console.log("REQUEST loadFragment" )
    //     return Promise.resolve(undefined);
    // }

}

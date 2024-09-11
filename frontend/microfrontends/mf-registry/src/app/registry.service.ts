import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RegistryService {
  retistryUrl="https://registry.solenopsys.org"

  constructor(private client: HttpClient) {}

  list(type: string): Observable<any> {
    return  this.client.get(this.retistryUrl+type )
  }
}

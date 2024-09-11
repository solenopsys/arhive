import { Injectable } from "@angular/core";
import { HStreamService } from "@solenopsys/fl-hyperstreams";
import { map, Observable } from "rxjs";
import { format } from "echarts";


const decode = (val) => JSON.parse(new TextDecoder().decode(val));

@Injectable({
  providedIn: "root"
})
export class GitService {

  constructor(private hs: HStreamService) {
  }

  listRepos(): Observable<any> {
    return this.list("repositoriesList");
  }

  list(type: string): Observable<any> {
    return this.hs.createStringQuery("git-wrapper", JSON.stringify({
      type: type,
      params: {}
    }), 1).pipe(map(decode)).pipe(map((val: { [key: string]: any }) => {
      let repos = [];
      for (const reposKey in val) {
        const newVal: object = val[reposKey];
        newVal["name"]=reposKey;
        let date = new Date(val[reposKey]?.commitDate*1000);
        newVal["date"]=    format.formatTime('yyyy-MM-dd', date);
        newVal["hash"]=   val[reposKey].commitHash?.substring(0,7)   ; //todo need refactoring
        repos.push(newVal)
      }
      return repos
    }));
  }

  createRepo(name: string): Observable<any> {
    return this.hs.createStringQuery("git-wrapper", JSON.stringify({
      type: "repositoryInit",
      params: { "name": name }
    }), 1).pipe(map(decode));
  }


}

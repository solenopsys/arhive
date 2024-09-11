import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from "rxjs";
import {GitService} from "../git.service";

@Component({
  selector: 'app-git-repos',
  templateUrl: './git-repos.component.html',
  styleUrls: ['./git-repos.component.scss']
})
export class GitReposComponent implements OnInit {

  repos!: string[] | undefined;

  newName!: string;

  constructor(private httpClient: HttpClient, private  gitService: GitService) {
  }

  ngOnInit(): void {
    this.loadRepos();
  }

  async loadRepos() {
    let text = await firstValueFrom(this.gitService.listRepos());
    console.log("TEXT",text)
    this.repos = text;

  }

  add(newName: string) {
    firstValueFrom(this.gitService.createRepo(newName)).then(ress => {
      console.log(ress);
      this.loadRepos();
    });
  }
}

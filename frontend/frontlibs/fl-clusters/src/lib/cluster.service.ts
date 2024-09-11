import {Injectable} from '@angular/core';
import {Cluster} from './clusters.store';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  constructor() {
  }

  getClusters(): Cluster[] {
    const str = localStorage.getItem('clusters');
    if (str === undefined || str === null) {
      return [];
    } else {
      return JSON.parse(str);
    }
  }

  setClusters(clusters: Cluster[]) {
    localStorage.setItem('clusters', JSON.stringify(clusters));
  }
}

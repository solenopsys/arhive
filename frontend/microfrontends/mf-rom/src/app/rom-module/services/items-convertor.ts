import {ProcessData, ResourceData} from '../stores/model';


export class ItemsConvertor {

    public fromServerConvert(res): { processes: ProcessData[], resources: ResourceData[] } {
        const {dbResources, resMap} = this.convertResources(res);
        const dbProcesses = this.convertProcesses(res);
        this.ijectIOresources(dbProcesses, resMap);
        return {processes: dbProcesses, resources: dbResources};
    }

    private ijectIOresources(dbProcesses: ResourceData[], resMap: {}) {
        for (const p of dbProcesses) {
            this.inject(p, resMap, 'in', 'out');
            this.inject(p, resMap, 'out', 'in');
        }
    }

    private inject(p: ResourceData, resMap: {}, from: string, to: string) {
        if (p[from]) {
            for (const i of p[from]) {
                if (!resMap[i.id][to]) {
                    resMap[i.id][to] = [];
                }
                resMap[i.id][to].push({id: p.id, count: i.count});
            }
        }
    }

    private convertProcesses(res) {
        const dbProcesses: ResourceData[] = [];
        for (const p of res.results[0].processes) {
            const prObject = {
                id: p.uid, title: p['rom.process'], in: p.inResources?.map(z => {
                    return {id: z.uid, count: z['inResources|count']};
                }), out: p.outResources?.map(z => {
                    return {id: z.uid, count: z['outResources|count']};
                })
            };
            dbProcesses.push(prObject);
        }
        return dbProcesses;
    }

    private convertResources(res) {
        const dbResources: ResourceData[] = [];

        const resMap = {};
        for (const p of res.results[0].resources) {
            const resObj = {id: p.uid, title: p['rom.resource']};
            dbResources.push(resObj);
            resMap[p.uid] = resObj;
        }
        return {dbResources, resMap};
    }
}

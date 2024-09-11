import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";

export class PlayOntrol {
    public current!: string;

    constructor(private client: HttpClient, private camera: string) {
    }

    getStartFrame(mils: number): Promise<any> {
        return firstValueFrom(
            this.client.get<{ file: string }>('/stream/' + this.camera + '/now/' + mils)
                .pipe(map(res => res.file)));
    }

    getNextFrame(before: number): Promise<string | undefined> {
        return firstValueFrom(
            this.client.get<{ file: string }>('/stream/' + this.camera + '/next/' + before)
                .pipe(map(res => res.file)));
    }

    init(startPoint: number): Promise<string> {
        return new Promise((resolve, error) => {
            this.getStartFrame(startPoint).then((file: string | undefined) => {
                // @ts-ignore
                this.current = file;
                // @ts-ignore
                setTimeout((z: any) => resolve(file), 1000);
            });
        });
    }

    nextFrame(): Promise<string> {
        return new Promise((resolve, error) => {
            const currentPoint = this.current.split('.')[0];
            this.getNextFrame(+currentPoint).then((file2: any) => {
                setTimeout((z: any) => resolve(file2), 2000);
                this.current = file2;
            });
        });
    }


}
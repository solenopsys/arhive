import {Inject, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'baseDir'
})
export class BaseDirPipe implements PipeTransform {
    constructor( @Inject('assets_dir') public baseDir: string) {
    }

    transform(value: unknown, ...args: unknown[]): string {
        return this.baseDir + value;
    }

}

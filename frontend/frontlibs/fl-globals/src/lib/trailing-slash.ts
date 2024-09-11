import {Location} from '@angular/common';


export function trailingSlash() {
    const __stripTrailingSlash = (Location as any).stripTrailingSlash;
    (Location as any).stripTrailingSlash = function _stripTrailingSlash(url: string): string {
        const queryString$: any = url.match(/([^?]*)?(.*)/);
        if (queryString$[2].length > 0) {
            return /[^\/]\/$/.test(queryString$[1]) ? queryString$[1] + '.' + queryString$[2] : __stripTrailingSlash(url);
        }
        return /[^\/]\/$/.test(url) ? url + '.' : __stripTrailingSlash(url);
    };
}

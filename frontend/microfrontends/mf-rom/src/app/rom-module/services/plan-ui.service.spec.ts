import {TestBed} from '@angular/core/testing';

import {convertGoalItems, PlanUiService} from './plan-ui.service';
import {HttpClientModule} from '@angular/common/http';

describe('PlanUiService', () => {
    let service: PlanUiService;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [HttpClientModule]});
        service = TestBed.inject(PlanUiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be right conversion', () => {
        const data = {
            goalLinks: [
                {uid: '0x1d4de', resources: [{uid: '0x1d4dd'}]},
                {uid: '0x1d4ea', resources: [{uid: '0x1d4e8'}]},
                {uid: '0x1d33a', resources: [{uid: '0x1d4e8'}]},
            ],
            items: [
                {uid: '0x1d4dd', 'rom.process': 'Create resources page'},
                {uid: '0x1d4e8', 'rom.process': 'Create node js proxy for dgraph!'},
                {uid: '0x1d4df', 'rom.process': 'Create GIt SYSTEM'}
            ]
        };
        const res = convertGoalItems('resources', 'rom.process', data);
        expect(res.length).toEqual(3);
        expect(res[0].goals.length).toEqual(1);
        expect(res[1].goals.length).toEqual(2);
        expect(res[2].goals).toEqual(undefined);
    });


});

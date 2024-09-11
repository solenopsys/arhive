import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {DataProvider, EntityTitle, FieldType, FormField} from "@solenopsys/ui-utils";

import {ProviderService} from "../provider.service";


@Component({
    selector: 'ui-case-field',
    templateUrl: './case-field.component.html',
    styleUrls: ['./case-field.component.scss'],
})
export class CaseFieldComponent  {
    FT = FieldType;

    @Input()
    config!: FormField;

    @Input()
    data!: string | number | boolean | Date | EntityTitle;

    @Output()
    dataChange = new EventEmitter<
        string | number | boolean | Date | EntityTitle
    >();

    @Input()
    width!: number;


    constructor(
        @Inject("ps")
        private ps: ProviderService
    ) {
    }


    initProvider(toEntity: string): DataProvider  {
        if (!toEntity) {
            throw new Error('ToEntity not set');
        }
        return  this.ps.getProvider(toEntity) as DataProvider
    }
}

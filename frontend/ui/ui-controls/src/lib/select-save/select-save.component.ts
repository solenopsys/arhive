import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FreeProvider} from "../model";



@Component({
    selector: 'ui-select-save',
    templateUrl: './select-save.component.html',
    styleUrls: ['./select-save.component.scss']
})
export class SelectSaveComponent {
    @Output()
    save = new EventEmitter<string>();

    @Input()
    dataProvider!: FreeProvider;

    @Input()
    value!:any;

    @Output()
    newSelect = new EventEmitter<boolean>();

    @Output()
    valueChange = new EventEmitter<any>();

    newText!: string;

    showSave = false;

    textChanged(text: string) {
        this.showSave = text !== '';
        this.newSelect.emit(false);
        this.newText = text;
    }

    entitySelect($event: any) {
        this.showSave = false;
        this.newSelect.emit(true);
        this.valueChange.emit(this.value);
    }

    saveNew(newText: string) {
        this.showSave = false;
        this.save.emit(newText);
        this.newSelect.emit(false);
    }
}



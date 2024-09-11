import {Component, EventEmitter, Inject, Input, Output} from "@angular/core";
import {AbstractField} from '../../abstract-field.component';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from "rxjs";
import {EntityTitle} from "@solenopsys/ui-utils";
import {FreeProvider} from "@solenopsys/ui-controls";
import {ProviderService} from "../../provider.service";

@Component({
    selector: 'ui-file-field',
    templateUrl: './file-field.component.html',
    styleUrls: ['./file-field.component.scss'],
})
export class FileFieldComponent
    extends AbstractField<EntityTitle> {
    @Input()
    override  value: any;

    selectShow = false;

    @Output()
    override valueChange = new EventEmitter<EntityTitle>();

    dp!: FreeProvider;

    fileToUpload!: any;

    constructor(private httpClient: HttpClient,
                @Inject("ps")
                private ps: ProviderService) {
        super();
        this.dp = ps.getProvider('file', 'file.name') as FreeProvider;
    }


    uploadFileToActivity() {
        const endpoint = '/files';
        const formData: FormData = new FormData();
        const fileName = btoa(encodeURIComponent(this.fileToUpload.name));
        formData.append('fileKey', this.fileToUpload, fileName);
        firstValueFrom(this.httpClient
            .post(endpoint, formData))
            .then((resp: any) => {
                this.value = {uid: resp.uid, title: resp.name};
                this.valueChange.emit(this.value);
                this.fileToUpload = undefined;
            });
    }

    handleFileInput(event: any) {
        const files: FileList = event.files;
        this.fileToUpload = files.item(0);
    }
}

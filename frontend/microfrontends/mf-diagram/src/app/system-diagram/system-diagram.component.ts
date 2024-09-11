import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DiagramLayout} from "./refactoring/layout";
import {BASE_THEME} from "./refactoring/config";
import {drawItem} from "./refactoring/abstract";
import {HubElement} from "./refactoring/elements/hub";
import {ModuleElement} from "./refactoring/elements/module";
import {ModuleSize} from "./refactoring/model";

export type DiagramConfig = {
    hubs: any[];
    leftIdiModules: any[];
    rightIdiModules: any[];
    powerGroup: any[];
}


@Component({
    selector: 'system-diagram',
    templateUrl: './system-diagram.component.html',
    styleUrls: ['./system-diagram.component.css']
})
export class SystemDiagramComponent implements OnInit {
    @ViewChild("2dDraw", {static: true})
    draw2DElement!: ElementRef<HTMLCanvasElement>;


    @Input()
    config!: DiagramConfig


    ngAfterViewInit(): void {

        this.render();
    }


    ngOnInit(): void {

    }

    testDraw(canvas: HTMLCanvasElement){
        canvas.width = 1000;
        canvas.height = 1000;

        let context = canvas.getContext("2d");
        new HubElement(
            {
                title: "UIC.2",
                description: "UIC.2",
                sideConnectors: 4,
                skip: [],
            }
        ).draw(context!);
    }

    testDrawModule(canvas:HTMLCanvasElement){
        canvas.width = 1000;
        canvas.height = 1000;

        let context = canvas.getContext("2d");
        new ModuleElement(
            {
                title: "Bla bla ",
                description: "sdfsd fsdf sdf sdfsd fsdf sd fsd fsd fsdfsdf",
                len: ModuleSize.Medium,
                width:1,
                ioConnectors:{},
                powerConnectors:[],


            }
        ).draw(context!);
    }


    fullDraw(canvas:HTMLCanvasElement){
        let ctx = canvas.getContext("2d");
        let theme = BASE_THEME;
        const dl = new DiagramLayout(theme)
        let transformData = dl.transformData(this.config);
        canvas.width = transformData.diagramSize.width;
        canvas.height = transformData.diagramSize.height;
        transformData.draws.forEach(d => drawItem(ctx, d, theme.gridPitch));
    }

    render() {
        const canvas = this.draw2DElement.nativeElement;

        //    this.testDrawModule(canvas);
       this.fullDraw(canvas);

    }
}

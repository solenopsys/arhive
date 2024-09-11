import {Component, OnInit} from '@angular/core';
import {EChartsOption, format} from 'echarts';
import {DgraphService} from "@solenopsys/fl-dgraph";
import {ColorSchemesService} from "@solenopsys/ui-themes";


@Component({
    selector: 'app-time-stat',
    templateUrl: './time-stat.component.html',
    styleUrls: ['./time-stat.component.scss']
})
export class TimeStatComponent implements OnInit {

    chartOptions2: EChartsOption;

    private dg: DgraphService;

  constructor(dg: DgraphService, private cs: ColorSchemesService) {
    this.dg = dg;
  }

    ngOnInit(): void {
        const query = '{\n' +
            'stat(func: has(rom.time)) @groupby(date){\n' +
            'sum(rom.time)\n' +
            '}\n' +
            '}';
        this.dg.query(query).subscribe((res:any) => {
            const stat = res.stat[0]['@groupby'].map(item => [new Date(item['date']).getTime(), item['sum(rom.time)'] / 60]);
            const datesN = stat.map(res => res[0]);
            const colorF = this.cs.schemes[this.cs.current]['font'];
            const dates = stat.map(res => res[0]);
            const values = stat.map(res => res[1]);
            this.chartOptions2 = {
                xAxis: {
                    type: 'time',
                    data: dates,
                    show: true,
                    axisLabel: {
                        color: 'gray',
                        fontWeight: 'bold',
                        rotate: 90,
                        formatter: val => {
                            return format.formatTime('yyyy-MM-dd', val);
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'Infected',
                        type: 'bar',
                        data: stat,
                        color: '#7777e1'
                    },
                ],
            };
            console.log(stat);
        });
    }

}

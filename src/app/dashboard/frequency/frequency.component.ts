import { Component, OnInit, ViewChild} from '@angular/core'
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
    selector:'frequency-component',
    templateUrl: './frequency.component.html',
    styleUrls:['./frequency.component.css'],
})

export class FrequencyComponent implements OnInit {

    public lineChartData: ChartConfiguration<'line'>['data'] = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
      ],
      datasets: [
        {
          data: [ 65, 59, 80, 81, 56, 55, 40 ],
          label: 'Series A',
          fill: true,
          tension: 0.1,
          borderColor: '#fff',
          backgroundColor: 'rgba(30, 58, 138)'
        }
      ]
    };
    public lineChartOptions: ChartOptions<'line'> = {
      responsive: true
    };
    public lineChartLegend = true;
  
    constructor() {
    }
  
    ngOnInit() {
    }

 }



















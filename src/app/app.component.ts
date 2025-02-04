import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, BaseChartDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'health-challenge-tracker';
  chartType: ChartType = 'bar';
  chartData: ChartData<'bar'> = {
    labels: ['Workout 1', 'Workout 2', 'Workout 3'],
    datasets: [
      { data: [30, 45, 60], label: 'Minutes' }
    ]
  };
}

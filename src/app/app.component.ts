import { Component } from '@angular/core';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
// import { RouterOutlet } from '@angular/router';
// import { NgIf } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartEvent, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BaseChartDirective, FormsModule, WorkoutFormComponent, WorkoutListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'health-challenge-tracker';
}

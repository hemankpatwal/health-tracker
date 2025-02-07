import { Component, OnInit, Input} from '@angular/core';
import { NgIf } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables  } from 'chart.js';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-workout-progress',
  standalone: true,
  imports: [NgIf, BaseChartDirective], 
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.css']
})
export class WorkoutProgressComponent implements OnInit {
  @Input() workouts: Workout[] = []; // ✅ Accept filtered workouts

  workoutData: { [key: string]: number } = {}; // Stores total minutes per workout type
  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  constructor(private workoutService: WorkoutService) {
    Chart.register(...registerables); // Register Chart.js components
  }

  ngOnInit(): void {
    this.loadWorkoutData();

    // Subscribe to updates in workouts
    this.workoutService.getWorkoutAddedObservable().subscribe(() => {
      this.loadWorkoutData();
    });
  }

  loadWorkoutData(): void {
    const workouts = this.workoutService.getWorkouts();
    
    // Reset data
    this.workoutData = {};
    
    // Aggregate workout minutes per type
    workouts.forEach(workout => {
      if (!this.workoutData[workout.workoutType]) {
        this.workoutData[workout.workoutType] = 0;
      }
      this.workoutData[workout.workoutType] += workout.workoutMinutes;
    });

    // Update chart data
    this.barChartLabels = Object.keys(this.workoutData);
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: Object.values(this.workoutData),
          label: 'Workout Minutes',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderWidth: 1
        }
      ]
    };
  }
}

import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent {
  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {
    this.workouts = this.workoutService.getWorkouts();
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-form',
  imports: [ReactiveFormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;

  constructor(private fb: FormBuilder, private workoutService: WorkoutService) {
    this.workoutForm = this.fb.group({
      userName: ['', Validators.required],
      workoutType: ['', Validators.required],
      workoutMinutes: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const newWorkout: Workout = {
        id: Date.now(), // Generate a unique ID
        ...this.workoutForm.value,
      };
      this.workoutService.addWorkout(newWorkout);
      this.workoutForm.reset(); // Clear the form
    }
  }
}
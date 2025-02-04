import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workouts: Workout[] = [];
  private storageKey = 'workouts';

  constructor() {
    this.loadWorkouts();
  }

  // Add a new workout
  addWorkout(workout: Workout): void {
    this.workouts.push(workout);
    this.saveWorkouts();
  }

  // Get all workouts
  getWorkouts(): Workout[] {
    return this.workouts;
  }

  // Load workouts from localStorage
  private loadWorkouts(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.workouts = JSON.parse(data);
    }
  }

  // Save workouts to localStorage
  private saveWorkouts(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.workouts));
  }
}
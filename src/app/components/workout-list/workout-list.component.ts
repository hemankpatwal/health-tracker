import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = []; // Filtered list of workouts
  searchText: string = ''; // Search input value
  selectedWorkoutType: string = ''; // Selected workout type filter

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    // Fetch initial workouts
    this.workouts = this.workoutService.getWorkouts();
    this.filteredWorkouts = this.workouts;

    // Subscribe to workoutAdded observable
    this.workoutService.getWorkoutAddedObservable().subscribe((workouts) => {
      this.workouts = workouts; // Update the list
      this.applyFilters();
    });
  }

  applyFilters(): void {
    console.log('Applying filters...'); // Debugging log
  
    this.filteredWorkouts = this.workouts.filter((workout) => {
      const matchesSearch = workout.userName
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
  
      const matchesWorkoutType = this.selectedWorkoutType
        ? workout.workoutType === this.selectedWorkoutType
        : true;
  
      return matchesSearch && matchesWorkoutType;
    });
  
    console.log('Filtered Workouts:', this.filteredWorkouts); // Debugging log
  }
  
  onSearchChange(): void {
    console.log('Search Changed:', this.searchText);
    this.applyFilters();
  }

  onWorkoutTypeChange(): void {
    console.log('Workout Type Changed:', this.selectedWorkoutType);
    this.applyFilters();
  }
}
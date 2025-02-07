import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  displayedWorkouts: Workout[] = [];
  searchText: string = ''; // Search input value
  selectedWorkoutType: string = ''; // Selected workout type filter

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;

  @Output() filteredWorkoutsChanged = new EventEmitter<Workout[]>(); // ✅ Emit filtered workouts


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
    
    this.currentPage = 1; // Reset to first page when filtering
    this.updateDisplayedWorkouts();

    console.log('Filtered Workouts:', this.filteredWorkouts); // Debugging log
  }

  // Pagination logic
  updateDisplayedWorkouts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);

    console.log(`Current Page: ${this.currentPage}`);
    console.log(`Displaying Workouts:`, this.displayedWorkouts);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredWorkouts.length) {
      this.currentPage++;
      this.updateDisplayedWorkouts();

      console.log(`Next Page Clicked, Current Page: ${this.currentPage}`);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedWorkouts();

      console.log(`Previous Page Clicked, Current Page: ${this.currentPage}`);
    }
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
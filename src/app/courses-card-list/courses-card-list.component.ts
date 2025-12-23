import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Course } from '../model/course';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
  imports: [MatCardModule, MatButtonModule, RouterLink],
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  editCourse({ description, longDescription, category }: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      description,
      longDescription,
      category,
    };

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe((val) => console.log('Dialog output:', val));
  }
}

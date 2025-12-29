import {
  Inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Course } from '../model/course';
import { CoursesService } from './courses.service';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(
    private coursesService: CoursesService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<Course> {
    const courseId = route.params['id'];
    const COURSE_KEY = makeStateKey<Course>(`courseKey-${courseId}`);
    if (this.transferState.hasKey(COURSE_KEY)) {
      const course = this.transferState.get(COURSE_KEY, null);
      this.transferState.remove(COURSE_KEY);
      return of(course);
    } else {
      return this.coursesService.findCourseById(courseId).pipe(
        first(),
        tap((course) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(COURSE_KEY, course);
          }
        }),
      );
    }
  }
}

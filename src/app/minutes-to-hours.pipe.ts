import { Pipe, PipeTransform } from '@angular/core';
/**
 * transforms minutes into strings like e.g 4h80
 */
@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(value: number): string {
    if (value > 0 && value / 60 < 1) {
      return `00h${value}`;
    } else {
      return `${Math.trunc(value / 60)}h${value % 60}`;
    }
  }
}

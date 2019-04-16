import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart',
})
export class PadStartPipe implements PipeTransform {
  transform(value: number, maxLength: number, fillString: string = '0'): any {
    if (typeof value !== 'number') {
      return value;
    }
    return String(value).padStart(maxLength, fillString);
  }
}

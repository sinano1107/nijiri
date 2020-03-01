import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const input = ("00000" + value).slice(-6);
    return `${input.slice(0,2)}:${input.slice(2,4)}`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true
})
export class TruncateNamePipe implements PipeTransform {

  transform(value: string, maxLength: number = 16, ellipses: string = '...'): unknown {

    if(value.length > maxLength) 
      return value.slice(0, maxLength+1) + ellipses;
    return value;
  }

}

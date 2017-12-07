import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strJson'
})
export class StrJsonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = JSON.parse(value);
    return result;
  }

}

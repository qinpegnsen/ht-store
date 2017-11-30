import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'money'
})
/**
 * 金额格式化
 */
export class MoneyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let strIndex: number = value.indexOf(".");
    if (strIndex > -1) {
      let arr = value.split("."), leng = arr[1].length;
      if (leng == 0) value = arr[0] + ".00";
      else if (leng == 1) value = value + "0";
      else value = arr[0] + "." + arr[1].substr(0, 2);
    } else value = value + ".00";
    return value;
  }

}

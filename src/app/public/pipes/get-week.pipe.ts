import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";
import {Util} from "../util/util";

/**
 * 根据日期获取是星期几
 */
@Pipe({
  name: 'getWeek'
})
export class GetWeekPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(isNullOrUndefined(value)) return null;
    else {
      let val =  new Date(value);
      return Util.getWeek(val,'cn');
    }
  }

}

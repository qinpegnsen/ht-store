import { Pipe, PipeTransform } from '@angular/core';
import {MainService} from "../service/main.service";

@Pipe({
  name: 'stateName'
})
export class StateNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let me = this, val;
    val = MainService.getEnumDataValByKey(args,value);
    return val;
  }

}

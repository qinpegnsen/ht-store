import {Pipe, PipeTransform} from '@angular/core';
import {Setting} from "../setting/setting";

@Pipe({
  name: 'imgErr'
})
export class ImgErrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? value : Setting.APP.defaultImg;
  }

}

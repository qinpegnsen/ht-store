import { Injectable } from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";

@Injectable()
export class RedPacketService {

  constructor() { }

  /**
   * get  成功不带提示
   * @param url
   * @param data
   */
  public static getNoTip(url,data){
    let result;
    AjaxService.get({
      url: url,
      data: data,
      async:false,
      success: (data) => {
        let info=data.info;
        if(data.success){
          result=data.data;
        }else{

        }
      },
      error: (res) => {

      }
    });
    return result;
  }

}

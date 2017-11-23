import {Injectable} from "@angular/core";
import {AjaxService} from "../../public/service/ajax.service";

@Injectable()
export class CashSettleService {

  constructor() {
  }

  /**
   * get  成功不带提示
   * @param url
   * @param data
   */
  public static getSettle(url,data){
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


  public static getInsert(url,data) {
    let me = this,result;
    AjaxService.post({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if (res.success) {
          result=res.data;
        } else{
        }
      },
      error: (res) => {
        console.log("post error");
      }
    })
    return result;
  }
}

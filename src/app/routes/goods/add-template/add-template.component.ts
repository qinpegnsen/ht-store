import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../session.service";
import {CHINA_AREA} from "../../../public/util/china_area";
import {AREA_LEVEL_1_JSON} from "../../../public/util/area_level_1";
import {AREA_LEVEL_3_JSON} from "../../../public/util/area_level_3";
import {isArray} from "rxjs/util/isArray";

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {
  validateForm: FormGroup;//添加运费模板的表单
  moduleList = [];//运费模板值列表
  linkType: string;//判断是添加模板还是修改模板
  cru: number = 0;//选择地区时获取的下标
  allCheckeds = [];//全选所有的
  china_area = CHINA_AREA;//大区数据
  area_level1 = AREA_LEVEL_1_JSON;//区域数据
  area_level2 = AREA_LEVEL_3_JSON;//区域数据
  data: Array<any> = [];//存储区域数据
  checkOptionsOnes = {};
  public staff: any = {};//获取的模板值数据
  public area_model: boolean = false;//地区的显示框

  constructor(private fb: FormBuilder,public routeInfo: ActivatedRoute,public session: SessionService) {
    this.validateForm = this.fb.group({
      userName            : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      radio_group         : [ 1 ],
    });
  }

  ngOnInit() {
    let me = this;
    me.linkType = this.routeInfo.snapshot.queryParams['linkType'];//获取地址栏的参数
  }

  /**
   * 遍历所有的地区数据（第一级，第二级的）
   * @param index
   * @param j
   * @param provices
   */
  updateAllChecked(index: number | string, j: number | string, provices: any) {
    let me = this;
    if (me.allCheckeds[index]['allChecked']) {
      me.data[index]['provices'].forEach(item => item.checked = true);
      provices.forEach(item => {
        me.checkOptionsOnes[item.areaCode][0].forEach(items => items.checked = true);
      });
    } else {
      me.data[index]['provices'].forEach(item => item.checked = false);
      provices.forEach(item => {
        me.checkOptionsOnes[item.areaCode][0].forEach(value => value.checked = false);
      });
    }
  }


  updateAllchildChecked(index: number | string, j: number | string, code: any) {
    let me = this;
    me.allCheckeds[index]['allChecked'] =
      me.data[index]['provices'].every(item => item.checked === true);
    // 添加运费模板时选择区域的  全选全不选
    if (me.data[index]['provices'][j]['checked']) {
      me.checkOptionsOnes[code][0].forEach(value => value.checked = true);
    } else {
      me.checkOptionsOnes[code][0].forEach(value => value.checked = false);
    }
  }

  updateSingleChecked(index: number | string, j: number | string, code: string) {
    let me = this;
    if (me.checkOptionsOnes[code][0].every(item => item.checked === false)) {
      me.data[index]['provices'][j]['checked'] = false;
    } else if (this.checkOptionsOnes[code][0].every(item => item.checked === true)) {
      me.data[index]['provices'][j]['checked'] = true;
    } else {
      me.data[index]['provices'][j]['checked'] = false;
    }
    me.allCheckeds[index]['allChecked'] =
      me.data[index]['provices'].every(item => item.checked === true);
  }

  getCheckOptionsOnes(code: string) {
    let me = this;
    const len = isArray(me.area_level2) ? this.area_level2.length : 0;
    for (let i = 0; i < len; i++) {
      if (me.area_level2[i]['areaCode'] === code) {
        const length = isArray(me.area_level2[i]['children']) ? me.area_level2[i]['children'].length : 0;
        const temp = [];
        me.checkOptionsOnes[me.area_level2[i]['areaCode']] = [];
        for (let j = 0; j < length; j++) {
          temp.push({
            label: me.area_level2[i]['children'][j]['areaName'],
            value: me.area_level2[i]['children'][j]['areaName'],
            checked: false,
            areaCode: me.area_level2[i]['children'][j]['areaCode']
          });
        }
        me.checkOptionsOnes[me.area_level2[i]['areaCode']].push(temp);
        break;
      }
    }
  }

  /**
   * 已选择的区域
   * @param provices
   * @param index
   */
  getProvices(provices: Array<string>, index: string) {
    let me = this;
    const len = isArray(this.area_level1) ? this.area_level1.length : 0;
    for (let i = 0; i < len; i++) {
      provices.forEach((item, indexs) => {
        if (item === me.area_level1[i]['areaCode']) {
          me.getCheckOptionsOnes(item);
          me.data[index]['provices']
            .push({
              label: me.area_level1[i].areaName,
              value: me.area_level1[i].areaName,
              areaCode: me.area_level1[i].areaCode,
              checked: false
            });
          if (isArray(me.allCheckeds[index]['content'])) {
            const tempObject = {};
            tempObject['childChecked'] = false;
            me.allCheckeds[index]['content'].push(tempObject);
          }
        }
      });
    }
  }

  getallCheckeds() {
    let me = this;
    const len = isArray(this.china_area) ? me.china_area.length : 0;
    for (let i = 0; i < len; i++) {
      me.allCheckeds.push({allChecked: false, content: []});
      me.data.push({label: me.china_area[i].chinaAreaName, provices: []});
      me.getProvices(me.china_area[i].provices, i + '');
    }
  }


  /**
   *获取选择区域后的结果
   */
  getResult(): string {
    let me = this;
    const len = isArray(me.data) ? me.data.length : 0;
    let tempResult = [];
    let tempAreaCode = [];
    for (let i = 0; i < len; i++) {
      const temp = [];
      const tempe = [];
      me.data[i]['provices'].forEach(item => {
        if (item.checked && !item.disabled) {
          temp.push(item.value);
          me.checkOptionsOnes[item.areaCode][0].forEach(value => {
            if (value.checked && !value.disabled) {
              tempe.push(value.areaCode);
            }
          });
        } else {
          me.checkOptionsOnes[item.areaCode][0].forEach(value => {
            if (value.checked && !value.disabled) {
              temp.push(value.value);
              tempe.push(value.areaCode);
            }
          });
        }
      });
      tempResult = tempResult.concat(temp);
      tempAreaCode = tempAreaCode.concat(tempe)
    }
    if(me.linkType=='addArticle'){
      me.moduleList[me.cru].area = tempAreaCode.join(',');
      me.moduleList[me.cru].area_cn = tempResult.join(',');
    }else if(me.linkType=='updataArticle'){
      me.staff.storeExpressTplValList[me.cru].area = tempAreaCode.join(',');
      me.staff.storeExpressTplValList[me.cru].area_cn = tempResult.join(',');
    }

    me.session.setData(me.cru, me.data);
    me.session.setCheck(me.cru, me.checkOptionsOnes);
    me.close();
    return tempAreaCode.join(',');
  }


  /**
   * 判断选择区域时选择了几个
   * @param areaCode
   * @returns {string}
   */
  getCount(areaCode: string) {
    let count = 0, me = this;
    me.checkOptionsOnes[areaCode][0].forEach(item => {
      if (item.checked === true) {
        count++;
      }
    });
    return count === 0 ? '' : '(' + count + ')';
  }

  /**
   * 关闭时区域的子集框消失
   */
  clear() {
    let me = this;
    me.close();
  }

  close() {
    let me = this;
    // allCheckeds[i]['content'][j]['childChecked']
    me.allCheckeds.forEach(item => {
      item['content'].forEach(value => {
        value['childChecked'] = false;
      })
    })
  }

  edit(index: number, area?: any) {
    // console.log(area);
    let me = this;
    me.cru = index;
    me.close();
    switch (me.linkType){
      case 'addArticle':
        if (me.moduleList[this.cru].area) {
          const temp = me.session.getDatas(me.moduleList.length - 1);
          const temp1 = me.session.getDatas(me.cru);
          const check = me.session.getCheck(me.moduleList.length - 1);
          const check1 = me.session.getCheck(me.cru);
          const len = isArray(temp) ? temp.length : 0;
          for (let i = 0; i < len; i++) {
            temp[i]['provices'].forEach((item, key) => {
              if (item.checked && !temp1[i]['provices'][key]['checked']) {
                temp1[i]['provices'][key]['checked'] = true;
                temp1[i]['provices'][key]['disabled'] = true;
              }
              check[item.areaCode][0].forEach((value, j) => {
                if (value.checked && !check1[item.areaCode][0][j]['checked']) {
                  check1[item.areaCode][0][j]['checked'] = true;
                  check1[item.areaCode][0][j]['disabled'] = true;
                }
              });
            });
          }
          me.data = temp1;
          me.checkOptionsOnes = check1;
        } else {
          me.allCheckeds.forEach((item) => {
            if (item.allChecked) {
              item['disabled'] = true;
            }
          });
          const len = isArray(this.data) ? me.data.length : 0;
          for (let i = 0; i < len; i++) {
            me.data[i]['provices'].forEach(item => {
              if (item.checked) {
                item['disabled'] = true;
              }
              me.checkOptionsOnes[item.areaCode][0].forEach(value => {
                if (value.checked) {
                  value['disabled'] = true;
                }
              });
            });
          }

        };
        break;
      case 'updataArticle':
        if (me.staff.storeExpressTplValList[this.cru].area) {
          const len = isArray(me.data) ? me.data.length : 0;
          let tempResult = me.staff.storeExpressTplValList[this.cru].area.split(',');
          for (let i = 0; i < len; i++) {
            me.data[i]['provices'].forEach((item, index) => {
              me.checkOptionsOnes[item.areaCode][0].forEach(value => {
                tempResult.forEach(valueS => {
                  if (value.areaCode === valueS) {
                    value.checked = true;
                  }
                })
              });
              me.data[i]['provices'][index]['checked'] =
                me.checkOptionsOnes[item.areaCode][0].every(value => value.checked);
              if (item.checked) {
              } else {
              }
            });
          }
        } else {
          me.allCheckeds.forEach((item) => {
            if (item.allChecked) {
              item['disabled'] = true;
            }
          });
          const len = isArray(this.data) ? me.data.length : 0;
          for (let i = 0; i < len; i++) {
            me.data[i]['provices'].forEach(item => {
              if (item.checked) {
                item['disabled'] = true;
              }
              me.checkOptionsOnes[item.areaCode][0].forEach(value => {
                if (value.checked) {
                  value['disabled'] = true;
                }
              });
            });
          }

        };
        break;
    }

  }


  /**
   * 添加运费模板值的时候table数组增加
   */
  add() {
    let me  = this;
    //
    if(me.linkType=='addArticle'){
      me.moduleList.push({area: '', index: me.moduleList.length + 1, firstNum: '', firstPrice: '', addAttach: '', addPrice: ''});
    }else if(me.linkType=='updataArticle'){
      me.staff.storeExpressTplValList.push({area: '', index: me.moduleList.length + 1, firstNum: '', firstPrice: '', addAttach: '', addPrice: ''});
    }
  }



  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }
    console.log(value);
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  };

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

}
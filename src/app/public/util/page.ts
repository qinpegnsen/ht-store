/**
 * 分页对象
 */
import {Injectable} from "@angular/core";

@Injectable()
export class Page {
  curPage: number;
  lastPage: boolean;
  needCountQuery: boolean;
  pageSize: number;
  params: any;
  sortColumns: string;
  totalPage: number;
  totalRow: number;
  voList: any;

  constructor(data?: any) {
    if (!data) data = {};
    this.curPage = data.curPage || 1;
    this.needCountQuery = data.needCountQuery || null;
    this.pageSize = data.pageSize || 10;
    this.params = data.params || null;
    this.sortColumns = data.sortColumns || null;
    this.totalRow = data.totalRow || 0;
    this.totalPage = data.totalPage || Math.ceil(this.totalRow / this.pageSize);
    this.voList = data.voList || null;
    this.lastPage = data.lastPage || this.isLastPage();
  }

  /**
   * 是否是最后一页
   * @returns {boolean}
   */
  isLastPage() {
    if (!this.totalRow || !this.pageSize) return true;
    else return Math.ceil(this.totalRow / this.pageSize) == this.curPage;
  }

  public genStartRow() {
    return (this.curPage - 1) * this.pageSize + 1;
  }

  public genEndRow() {
    return this.curPage * this.pageSize;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor() {}



  onPageNumber(pageNumber: number) {}

  pageCount(perPage: number, array: any[]) {

    let pageAmount: number = 0;

    if(array.length % perPage != 0){

    pageAmount = Math.trunc(array.length / perPage) + 1;

    }
    else {
      pageAmount = array.length / perPage;
    }


    return pageAmount;
  }

  //Returns array containing a string of the current page number and
  //If the current page number is the last or first page in the series, returns array of current number, then the previous or next.

  limitPageButtons(pageNum: number, current: number) {
    let showPages: number[] = [];

    let totalPages = pageNum;

    let startPage = current <= 1 ? true : false;
    let endPage = current === totalPages ? true : false;

    if(totalPages === 1){
      showPages.push(current);
      return showPages;
    } else if(totalPages === 2){
      if(startPage){
        showPages.push(current);
        showPages.push(current+1);

      }
      else if(endPage){
        showPages.push(current-1);
        showPages.push(current);
        
      }

      return showPages;

    } else if (startPage) {
      showPages.push(current);
      showPages.push(current+1);
      showPages.push(current+2);
      return showPages;


    } else if (endPage) {
      showPages.push(current-2);
      showPages.push(current-1);
      showPages.push(current);
      return showPages;


    } else {
      showPages.push(current-1);
      showPages.push(current);
      showPages.push(current+1);
      return showPages;
    }
  }

  paginateArray(current: number, perPage: number, array: any[]) {

    let sliceStart = current === 1 ? 0 : (current-1) * perPage;

    let sliceEnd = sliceStart + perPage;

    let returnArray = array.slice(sliceStart, sliceEnd);

    return returnArray;
  }
}

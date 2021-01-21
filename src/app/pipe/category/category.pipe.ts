import { Pipe, PipeTransform } from '@angular/core';
import {ExpenseInterface} from "../../interfaces/ExpenseInterface";

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: ExpenseInterface[], type: string): any {
    if(type === 'All' || type === undefined){
      return value;
    }else{
      return value.filter(val => val.type === type);
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsePipe'
})
export class ResponsePipePipe implements PipeTransform {

  
  transform(response: string, param: boolean){
    if(param ===false){
      return response.slice(0, 255)
    }else{
      return response.slice(0, 4000)
    }
  }

}

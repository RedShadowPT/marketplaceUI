import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFlag'
})
export class CountryFlagPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const className = 'flag-icon-' + value.toLowerCase();
    // console.log(className);
    return className;
  }

}

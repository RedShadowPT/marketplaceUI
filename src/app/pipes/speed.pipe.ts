import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed'
})

export class SpeedPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // function formatBits(bits) {
    //   if (bits < 1000) {
    //     return bits + ' bps';
    // } else
    //     if (bits < 1000000) {
    //       return (bits / 1000).toFixed(2) + ' Kbps';
    //     } else
    //     if (bits < 1000000000) { return (bits / 1000000).toFixed(2) + ' Mbps';
    //   } else {
    //     return (bits / 1000000000).toFixed(2) + ' Gbps';
    //   }
    // }

    function formatBytes(bits) {
      if (bits < 1024) {
        return bits + ' Bps';
    } else
        if (bits < 1048576) {
          return (bits / 1024).toFixed(2) + ' KBps';
        } else
        if (bits < 1073741824) { return (bits / 1048576).toFixed(2) + ' MBps';
      } else {
        return (bits / 1073741824).toFixed(2) + ' GBps';
      }
    }


    return formatBytes(value);

  }

}

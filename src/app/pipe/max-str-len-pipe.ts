import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxStrLen'
})
export class MaxStrLenPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    if (text.length <= limit) return text;
    const slice = text.slice(0, limit).trimEnd();
    return slice + '...'
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'organisationGroup',
  pure: false // This makes the pipe impure, allowing it to recalculate on each change detection cycle
})
export class OrganisationGroupPipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) return [];
    const grouped: { [key: string]: any[] } = {}; // Define the type explicitly
    items.forEach(item => {
      const key = item.organisation;
      grouped[key] = grouped[key] || [];
      grouped[key].push(item);
    });
    return Object.values(grouped);
  }
}

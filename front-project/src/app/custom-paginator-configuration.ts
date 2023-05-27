import { MatPaginatorIntl } from '@angular/material/paginator';
import { range } from 'rxjs';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  const rangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return `0 z ${length}`;
    }
    length: Math.max(length, 0);
    const startIndex = page * pageSize;

    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} z ${length}`;
  };

  customPaginatorIntl.itemsPerPageLabel = 'Postów na stronie:';
  customPaginatorIntl.firstPageLabel = 'Pierwsza strona';
  customPaginatorIntl.lastPageLabel = 'Ostatnia strona';
  customPaginatorIntl.previousPageLabel = 'Poprzednia strona';
  customPaginatorIntl.nextPageLabel = 'Następna strona';
  customPaginatorIntl.getRangeLabel = rangeLabel;

  return customPaginatorIntl;
}

import { Component, ContentChildren, Directive, Input, OnInit, TemplateRef, ViewChild, AfterContentInit, ViewEncapsulation, ContentChild, AfterViewInit, OnDestroy, Optional, OnChanges, QueryList, ViewChildren, ViewContainerRef, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import { merge, Observable, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Directive({
  selector: '[n2ng-table-cell]',
})
export class N2ngTableCellDirective {
  constructor(public template: TemplateRef<any>) { }
}

@Directive({
  selector: '[n2ng-table-header-cell]',
})
export class N2ngTableHeaderCellDirective {
  constructor(public template: TemplateRef<any>) { }
}

@Directive({
  selector: 'n2ng-table-column'
})
export class N2ngTableColumnComponent<Record extends { [key: string]: any }> implements OnInit {
  @Input() name!: string;

  @Input() label?: string;

  @Input() dataAccessor?: ((column: N2ngTableColumnComponent<Record>, data: Record) => string);

  @Input() sortable: (boolean | ((data: any[], sortDirection: SortDirection, sortField: string) => any[])) = n2ngTableSort;

  @Input() class: string = '';

  @Input() headerClass: string = '';

  @ContentChild(N2ngTableCellDirective) cell?: N2ngTableCellDirective;

  @ContentChild(N2ngTableHeaderCellDirective) headerCell?: N2ngTableHeaderCellDirective;

  constructor() { }

  ngOnInit(): void {
    if (this.label === undefined) {
      this.label = this.name;
    }
  }
}

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export function n2ngTableSort(data: any[], sortDirection: SortDirection, sortField: string): any[] {
  const factor = (sortDirection == 'desc') ? -1: ((sortDirection == 'asc')? 1: 0);

  return data
    .sort((a: any, b: any) => {
      let aValue = a[sortField!];
      let bValue = b[sortField!];
      if (aValue == bValue) {
        return 0;
      } else if (aValue === null) {
        return -factor;
      } else if (bValue === null) {
        return factor;
      } else {
        return aValue < bValue? -factor : factor
      }
    });
}

@Component({
  selector: 'n2ng-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html'
})
export class N2ngTableComponent<Record extends { [key: string]: any }> implements AfterContentInit, OnInit, OnDestroy {
  @Input() enableFilter = true;
  @Input() maxPaginationSize = 5;
  @Input() defaultPageSize = 20;
  @Input() pageSizeOptions = [20, 50, 100];
  @Input() enablePagination = true;
  @Input() enablePageSize = true;
  @Input() class: string = '';

  @ContentChildren(N2ngTableColumnComponent) columnDefs?: QueryList<N2ngTableColumnComponent<Record>>;

  pageSizeControl: FormControl = new FormControl();
  filterControl: FormControl = new FormControl();

  renderingData!: any[];
  dataSource!: any[];

  page = 1;
  filteredCount = 1;
  sortField?: string;
  sortFunction: (data: any[], sortDirection: SortDirection, sortField: string) => any[] = n2ngTableSort;
  sortDirection: SortDirection = '';

  @ViewChild(NgbPagination, { static: true }) paginator!: NgbPagination;

  dataLoadSubscription?: Subscription;
  controlSubscription: Subscription;

  @Input()
  set dataLoad(data: Observable<Record[]> | Record[] | null) {
    if (this.dataLoadSubscription) {
      this.dataLoadSubscription.unsubscribe();
      this.dataLoadSubscription = undefined;
    }
    if (data instanceof Observable) {
      this.dataLoadSubscription = data.subscribe(records => {
        this.dataSource = records;
        this.updateRenderingData();
      })
    } else {
       if (data instanceof Array) {
        this.dataSource = data;
      } else {
        this.dataSource = [];
      }
      this.updateRenderingData();
    }
  }

  constructor() {
    let filterStream = this.filterControl.valueChanges
      .pipe(
        debounceTime(200)
      )

    this.controlSubscription = merge(filterStream, this.pageSizeControl.valueChanges)
      .pipe(
        tap(_ => this.updateRenderingData())
      )
      .subscribe();
  }

  ngOnInit(): void {

    this.pageSizeControl.setValue(this.defaultPageSize);
  }

  ngOnDestroy(): void {
    this.controlSubscription.unsubscribe();

    if (this.dataLoadSubscription) {
      this.dataLoadSubscription.unsubscribe();
      this.dataLoadSubscription = undefined;
    }
  }

  ngAfterContentInit(): void {
    // this.displayedColumns = this.columnDefs?.map(columnDef => columnDef.name) ?? [];
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }


  getData(column: N2ngTableColumnComponent<Record>, row: Record): string {
    if (column.dataAccessor) {
      return column.dataAccessor(column, row);
    }

    let val = row[column.name]

    switch (Object.prototype.toString.call(val)) {
      case '[object Boolean]':
        return val ? '○' : '×';
      case '[object Date]':
        return format(val, 'yyyy-MM-dd HH:mm');
    }
    return val
  }

  get pageSize(): number {
    return +this.pageSizeControl.value;
  }


  filterPredicate(data: Record, filter: string): boolean {
    let dataStr = this.columnDefs?.reduce<string>((accumulator, column) => {
      let val = this.getData(column, data)
      if ((val === undefined) || (val === null)) {
        return accumulator;
      }
      return (0 < accumulator.length)? `${accumulator}\t${val}`: val.toString();
    }, '') ?? '';
    return filter.trim().split(' ').some(filterWord => dataStr.indexOf(filterWord) != -1);
  }

  updateRenderingData() {
    let processed: any[] = (Array.isArray(this.dataSource)) ? [...this.dataSource] : [];

    if ((this.sortField !== undefined) && (this.sortDirection !== '')) {
      processed = this.sortFunction(processed, this.sortDirection, this.sortField);
    }

    if (0 < this.filterControl?.value?.length) {
      processed = processed.filter(d => this.filterPredicate(d, this.filterControl?.value));
    }

    this.filteredCount = processed.length;

    this.renderingData = processed.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  onPageChange(page: number) {
    this.page = page;
    this.updateRenderingData();
  }

  onSort(column: N2ngTableColumnComponent<Record>) {
    if (column.sortable !== false) {
      if (this.sortField !== column.name) {
        this.sortDirection = 'asc';
      } else {
        this.sortDirection = rotate[this.sortDirection]
      }
      if (this.sortDirection.length == 0) {
        this.sortField = undefined
      } else {
        this.sortField = column.name;

        if (typeof column.sortable == 'function') {
          this.sortFunction = column.sortable;
        } else {
          this.sortFunction = n2ngTableSort;
        }
      }

      this.updateRenderingData();
    }
  }

}

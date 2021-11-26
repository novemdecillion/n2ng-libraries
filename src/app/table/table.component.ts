import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  dataSource = [
    { name: '1', value: null},
    { name: '12', value: null},
    { name: '123', value: null},
    { name: '1234', value: null},
    { name: '12345', value: null},
    { name: '123456', value: null},
    { name: '1234567', value: 'a-1'},
    { name: '12345678', value: 'b-2'},
    { name: '123456789', value: 'a-3'},
    { name: '1234567890', value: null},
    { name: '12345678901', value: null},
    { name: '123456789012', value: null},
    { name: '1234567890123', value: null},
    { name: '12345678901234', value: null},
    { name: '123456789012345', value: null},
    { name: '1234567890123456', value: null},
    { name: '12345678901234567', value: null},
    { name: '123456789012345678', value: null},
    { name: '1234567890123456789', value: null},
    { name: '12345678901234567890', value: null},
    { name: '123456789012345678901', value: null},
    { name: '1234567890123456789012', value: null},
    { name: '12345678901234567890123', value: null},
    { name: '1234567890123456789012345', value: null}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

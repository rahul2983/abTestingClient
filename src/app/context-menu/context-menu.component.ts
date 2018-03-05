import { Component, OnInit, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  @Input() x = 0;
  @Input() y = 0;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'angular-ngx-treeview-app';

  config: TreeviewConfig = {
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: true,
    maxHeight: 500,
    hasDivider: true
  };

  items: any;

  simpleItems = {
    text: 'parent-1',
    value: 'p1',
    children: [
      {
        text: 'child-1',
        value: 'c1'
      }, {
        text: 'child-2',
        value: 'c2',
        children: [
          {
            text: 'child-1-2',
            value: 'c12'
          },
          {
            text: 'child-1-2',
            value: 'c12',
            disabled: true,
            collapsed: true,
            checked: true,
            children: [
              {
                text: 'child-1-2',
                value: 'c12'
              },
              {
                text: 'child-1-2',
                value: 'c12'
              }
            ]
          }
        ]
      },
    ]
  };

  simpleItems2 = {
    text: 'parent-2',
    value: 'p2',
    collapsed: true,
    children: [
      {
        text: 'child-1',
        value: 'c1'
      }, {
        text: 'child-2',
        value: 'c2',
        children: [
          {
            text: 'child-1-2',
            value: 'c12'
          },
          {
            text: 'child-1-2',
            value: 'c12',
            disabled: true,
            collapsed: true,
            checked: true,
            children: [
              {
                text: 'child-1-2',
                value: 'c12'
              },
              {
                text: 'child-1-2',
                value: 'c12'
              }
            ]
          }
        ]
      },
    ]
  };


  constructor() { }

  ngOnInit(): void {
    this.items = this.getItems([this.simpleItems, this.simpleItems2]);
  }

  getItems(parentChildObj) {
    let itemsArray = [];
    parentChildObj.forEach(set => {
      itemsArray.push(new TreeviewItem(set))
    });
    return itemsArray;
  }

}

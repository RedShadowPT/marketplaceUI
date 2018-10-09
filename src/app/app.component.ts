import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

// Import Node Interface
import { Node } from './interfaces/Node';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  {
 title = 'Lethean Marketplace';
 activeNode: Node = {};

 setActiveNode ( node: Node) {
   if (node) {
    this.activeNode = node;
   } else {
     console.log('Empty event detected!');
   }
 }
}




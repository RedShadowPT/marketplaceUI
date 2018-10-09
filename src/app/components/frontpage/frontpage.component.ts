import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

// Import Node Interface
import { Node } from '../../interfaces/Node';


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})


export class FrontpageComponent  {
 activeNode: Node = {};

 setActiveNode ( node: Node) {
   if (node) {
    this.activeNode = node;
   } else {
     console.log('Empty event detected!');
   }
 }
}

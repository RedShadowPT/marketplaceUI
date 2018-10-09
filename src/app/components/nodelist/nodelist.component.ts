import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

// interface
import { Node } from '../../interfaces/Node';

// Services
import { NodesDataService } from '../../services/nodes-data.service';
import { PagerService } from '../../services/pagerservice.service';

@Component({
  selector: 'app-nodelist',
  templateUrl: './nodelist.component.html',
  styleUrls: ['./nodelist.component.css']
})
export class NodelistComponent implements OnInit, AfterViewInit {
  @Output() selectedmarker: EventEmitter<Node> = new EventEmitter();
  @ViewChild('searchStringFocus') searchStringElement: ElementRef;
  @ViewChild('paneFocus') panel: ElementRef;

  // Flags
  SortDirection = false; // Sort Flag - Descending = false, Ascending = true

  // Compose output variables
  nodes: Node[];
  filteredNodes: Node[];
  pagedFilteredNodes: Node[];
  currentSort = '';

  // Search bar functionality
  private _searchString: string;
  get searchString() {
    return this._searchString;
  }
  set searchString(value) {
    this._searchString = value;
    this.filteredNodes = this.filterNodes(value);
    // this.pagedFilteredNodes = this.filteredNodes;
    this.setPage(1);
  }

  // Pager object
  pager: any = {};
  private _itemsPerPage = 5; // default 5

  set itemsPerPage(value) {
    this._itemsPerPage = value;
    // console.log(this._itemsPerPage);
    this.setPage(1);
  }

  get itemsPerPage() {
    return this._itemsPerPage;
  }

  filterNodes(searchTerm) {
    return this.nodes.filter(node => {
      const checkProviderName = (node.providerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
      const checkContinent = (node.proxy.findIndex(proxy => proxy.continent_code.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1));
      const checkCity = (node.proxy.findIndex(proxy => proxy.city.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1));
      const checkCountry_name = (node.proxy.findIndex(proxy => proxy.country_name.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1));
      const checkCountry_code = (node.proxy.findIndex(proxy => proxy.country_code.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1));
      const checkPort = (node.proxy.findIndex(proxy => proxy.port.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1));
      const checkEndpoint = (node.proxy.findIndex(proxy => proxy.endpoint.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1));

      const filteredData = checkProviderName
        || checkContinent
        || checkCity
        || checkCountry_name
        || checkCountry_code
        || checkPort
        || checkEndpoint;

      return filteredData;
    });
  }

  constructor(
    private nodesDataService: NodesDataService,
    private pagerService: PagerService) { }

  sortType(field: string, sortDirection: string) {
    // console.log('Sorting by Type');
    this.filteredNodes
      .sort((a: Node, b: Node) => {
        if (sortDirection) {
          return a[field].valueOf() > b[field].valueOf() ? 1 : a[field].valueOf() < b[field].valueOf() ? -1 : 0;
        } else {
          return a[field].valueOf() < b[field].valueOf() ? 1 : a[field].valueOf() > b[field].valueOf() ? -1 : 0;
        }
      });
  }

  sortProxyType(field: string, sortDirection: boolean) {
    // console.log('Sorting by Proxy');
    this.filteredNodes
      .sort((a: Node, b: Node) => {
        const item1 = a.proxy[0];
        const item2 = b.proxy[0];
        if (sortDirection) {
          const sort1 = item1[field].valueOf() > item2[field].valueOf();
          const sort2 = item1[field].valueOf() < item2[field].valueOf();
          return sort1 ? 1 : sort2 ? -1 : 0;
        } else {
          const sort1 = item1[field].valueOf() < item2[field].valueOf();
          const sort2 = item1[field].valueOf() > item2[field].valueOf();
          return sort1 ? 1 : sort2 ? -1 : 0;
        }
      });
  }

  sortRating(sortDirection: string) {
    // console.log('Sorting by Rate');
    this.filteredNodes
      .sort((a: Node, b: Node) => {
        const item1 = (a.mSpeed + a.mStability) / 2;
        const item2 = (b.mSpeed + b.mStability) / 2;
        if (sortDirection) {
          const sort1 = item1.valueOf() > item2.valueOf();
          const sort2 = item1.valueOf() < item2.valueOf();
          return sort1 ? 1 : sort2 ? -1 : 0;
        } else {
          const sort1 = item1.valueOf() < item2.valueOf();
          const sort2 = item1.valueOf() > item2.valueOf();
          return sort1 ? 1 : sort2 ? -1 : 0;
        }
      });
  }

  sortTable(field, direction, event) {
    // event.preventDefault();
    // this.panel.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    this.currentSort = field;

    switch (field) {
      case 'rating':
        this.sortRating(direction);
        this.setPage(1);
        break;
      case 'continent_code':
        this.sortProxyType(field, direction);
        this.setPage(1);
        break;
      default:
        this.sortType(field, direction);
        this.setPage(1);
    }
  }

  selectMarker(node) {
    if (node) {
      this.selectedmarker.emit(node);
    }
  }

  totalItems() {
    return this.filteredNodes.length;
  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.filteredNodes.length, page, this._itemsPerPage);

    // get current page of items
    this.pagedFilteredNodes = this.filteredNodes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ngAfterViewInit() {
    this.searchStringElement.nativeElement.focus();
  }

  ngOnInit() {
    this.nodesDataService.getNodesData().subscribe(data => {
      // const length = data.length;
      // console.log('DEBUG: Got ' + length + ' nodes to display');
      // console.log(data);
      this.nodes = data;
      this.filteredNodes = this.nodes;
      // initialize to page 1
      this.setPage(1);
    });
  }
}

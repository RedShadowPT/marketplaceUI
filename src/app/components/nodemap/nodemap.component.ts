import { Component, OnInit, HostBinding, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MouseEvent } from '@agm/core';

// Services
import { NodesDataService } from '../../services/nodes-data.service';

// Interfaces
import { Node } from '../../interfaces/Node';
import { Marker } from '../../interfaces/Marker';

@Component({
  selector: 'app-nodemap',
  templateUrl: './nodemap.component.html',
  styleUrls: ['./nodemap.component.css']
})

export class NodemapComponent implements OnInit {
  private _selectedmapmarker: Node;

  @Input() set selectedmapmarker(node: Node) {
    if (node) {
      this._selectedmapmarker = node;
      this.openWindow(node.providerName);
      this.setMapCenter(this.getMarkerbyNode(node));
    }
  }
  /** Flag for open Info Window */
  openedWindow = '';

  public map: any;
  // google maps zoom level
  zoom = 3;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  backgroundColor = '';
  mapTypeId = 'terrain';

  markers: Marker[];

  disableDefaultUI = false;

  styles: any[] = [
    {
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#212121'
        }
      ]
    },
    {
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#757575'
        }
      ]
    },
    {
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#212121'
        }
      ]
    },
    {
      'featureType': 'administrative',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#757575'
        }
      ]
    },
    {
      'featureType': 'administrative.country',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#9e9e9e'
        }
      ]
    },
    {
      'featureType': 'administrative.locality',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#bdbdbd'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#757575'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#181818'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#616161'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#1b1b1b'
        }
      ]
    },
    {
      'featureType': 'road',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#2c2c2c'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#8a8a8a'
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#373737'
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#3c3c3c'
        }
      ]
    },
    {
      'featureType': 'road.highway.controlled_access',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#4e4e4e'
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#616161'
        }
      ]
    },
    {
      'featureType': 'transit',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#757575'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#000000'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#3d3d3d'
        }
      ]
    }
  ];

  // clickedMarker(label: string, index: number) {
  //   // console.log(`clicked the marker: ${label || index}`);
  // }

  public setMapCenter = (markerObj) => {
    if (this.map) {
      this.map.setCenter({ lat: markerObj.lat, lng: markerObj.lng });
    }
    // console.log('clicked', markerObj, { lat: markerObj.lat, lng: markerObj.lng });
  }

  constructor(private nodesDataService: NodesDataService) { }
  public mapReady(map) {
    this.map = map;
  }

  getMarkerbyNode(node) {
    if (this.markers) {
      return this.markers.find((element) => {
        return element.label === node.providerName;
      });
    }
  }

  /** open info window */
  isInfoWindowOpen(id) {
    return this.openedWindow === id;
  }

  openWindow(id) {
    this.openedWindow = id;
  }

  /** On Init of this controller */
  ngOnInit() {
    this.nodesDataService.getNodesGeoData().subscribe(data => {

      this.markers = data;
    });
  }
}

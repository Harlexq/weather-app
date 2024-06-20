import { Component, HostListener } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat, toLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM.js';
import { CurrentWeather } from 'src/app/models/CurrentWeather';
import { MapService } from 'src/app/services/map.service';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { Style, Icon } from 'ol/style.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  map!: Map;
  currentWeather: CurrentWeather | null = null;
  vectorLayer!: VectorLayer<Feature>;
  vectorSource!: VectorSource;
  isScrolled = false;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.vectorSource = new VectorSource();

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });

    this.map = new Map({
      view: new View({
        center: fromLonLat([35, 39]),
        zoom: 5,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      target: 'map',
    });

    this.map.on('click', (e) => {
      const coords = toLonLat(e.coordinate) as [number, number];
      this.getCurrentWeather(coords);

      this.vectorSource.clear();

      const iconFeature = new Feature({
        geometry: new Point(e.coordinate),
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/icons/map.png',
        }),
      });

      iconFeature.setStyle(iconStyle);

      this.vectorSource.addFeature(iconFeature);
    });
  }

  getCurrentWeather(coords: [number, number]): void {
    const [lon, lat] = coords;
    this.mapService.getCurrentWeather(lon, lat).subscribe({
      next: (res: CurrentWeather) => {
        this.currentWeather = res;
      },
      error: (err) => {
        console.log('Hava durumu alınamadı:', err);
      },
    });
  }

  sidebarClose() {
    this.currentWeather = null;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScroll = window.pageYOffset;
    this.isScrolled = currentScroll > 80;
  }
}

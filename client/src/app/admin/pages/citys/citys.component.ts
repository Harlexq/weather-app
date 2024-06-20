import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { City } from 'src/app/models/City';
import { HttpClientService } from 'src/app/services/http-client.service';
import { CustomDialogService } from 'src/app/services/primeng/cutom-dialog.service';

@Component({
  selector: 'app-citys',
  templateUrl: './citys.component.html',
  styleUrls: ['./citys.component.scss'],
  providers: [DialogService],
})
export class CitysComponent {
  citys: City[] = [];
  city: City | null = null;
  citySharedVisible: boolean = false;
  selectedCityId: number | null = null;

  constructor(
    private http: HttpClientService,
    private customDialogService: CustomDialogService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getCitys();
  }

  getCitys() {
    this.http.get<City[]>('citys', (res) => {
      this.citys = res;
    });
  }

  cityShared(cityId?: number) {
    this.selectedCityId = cityId || null;
    this.citySharedVisible = !this.citySharedVisible;
  }

  cityDelete(cityId: number) {
    this.customDialogService.delete('Şehri', 'Şehir', 'city', cityId);
  }
}

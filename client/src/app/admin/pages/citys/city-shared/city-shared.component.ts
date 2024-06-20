import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { City } from 'src/app/models/City';
import { HttpClientService } from 'src/app/services/http-client.service';
import { CitysComponent } from '../citys.component';

@Component({
  selector: 'city-shared',
  templateUrl: './city-shared.component.html',
  styleUrls: ['./city-shared.component.scss'],
})
export class CitySharedComponent {
  @Input() selectedCityId: number | null = null;
  cityForm!: FormGroup;
  selectedFile!: File;
  citys: City[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private citysComponent: CitysComponent
  ) {}

  ngOnInit(): void {
    this.getCitys();
  }

  ngOnChanges() {
    this.cityFormCreate();
    if (this.selectedCityId !== null && this.selectedCityId !== undefined) {
      this.getDetailBlog();
    }
  }

  cityFormCreate() {
    this.cityForm = this.formBuilder.group({
      name: ['', Validators.required],
      path: ['', Validators.required],
    });
  }

  getDetailBlog() {
    if (this.selectedCityId !== null && this.selectedCityId !== undefined) {
      this.http.getById<City>(`city`, this.selectedCityId, (res) => {
        this.cityForm.patchValue({
          name: res.name,
          path: res.path,
        });
      });
    }
  }

  getCitys() {
    this.http.get<City[]>('citys', (res) => {
      this.citys = res;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.files[0] as File;
  }

  cityFormSubmit(cityId?: number) {
    if (cityId !== undefined) {
      this.confirmationService.confirm({
        message: 'Bu Şehri Güncellemek İstediğinize Emin Misiniz?',
        header: 'Şehir Güncelleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Güncellendi',
            detail: 'Şehir Güncelleme İşlemi Başarılı',
          });

          const formData = new FormData();
          formData.append('name', this.Name.value);
          formData.append('flag', this.selectedFile);
          formData.append('path', this.Path.value);

          this.http.put<FormData>(`city`, cityId, formData, (res) => {
            this.citysComponent.citySharedVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Şehir Güncelleme İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message: 'Bir Şehir Eklemek İstediğinize Emin Misiniz?',
        header: 'Şehir Ekleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Eklendi',
            detail: 'Şehir Ekleme İşlemi Başarılı',
          });

          const formData = new FormData();
          formData.append('name', this.Name.value);
          formData.append('flag', this.selectedFile);
          formData.append('path', this.Path.value);

          this.http.post<FormData>(`cityCreate`, formData, () => {
            this.citysComponent.citySharedVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Şehir Ekleme İşlemi İptal Edildi',
          });
        },
      });
    }
  }

  get Name(): FormControl {
    return this.cityForm.get('name') as FormControl;
  }

  get Path(): FormControl {
    return this.cityForm.get('path') as FormControl;
  }
}

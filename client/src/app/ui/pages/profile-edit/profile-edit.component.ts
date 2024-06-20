import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent {
  profileForm!: FormGroup;
  user: User | null = null;
  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createProfileForm();
    const userId = localStorage.getItem('userId');
    this.http.getById<User>('user', Number(userId), (res) => {
      this.user = res;
      this.profileForm.patchValue({
        name: res.name,
        email: res.email,
        city: res.city,
        country: res.country,
      });
      this.Gender.patchValue(res.gender);
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      city: [''],
      gender: [''],
      country: [''],
    });
  }

  profileSubmit() {
    this.confirmationService.confirm({
      message: 'Profilini Güncellemek İstediğinize Emin Misiniz?',
      header: 'Profil Güncelleme',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Güncellendi',
          detail:
            'Profil Güncelleme İşlemi Başarılı Sayfa 3 Saniye İçinde Yenilenecektir',
        });

        const userId = localStorage.getItem('userId');

        const formData = new FormData();
        formData.append('name', this.Name.value);
        formData.append('email', this.Email.value);
        formData.append('profileImage', this.selectedFile);
        formData.append('city', this.City.value);
        formData.append('gender', this.Gender.value);
        formData.append('country', this.Country.value);

        this.http.put<FormData>('user', Number(userId), formData, (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Profil Güncelleme İşlemi İptal Edildi',
        });
      },
    });
  }

  get Name(): FormControl {
    return this.profileForm.get('name') as FormControl;
  }

  get Email(): FormControl {
    return this.profileForm.get('email') as FormControl;
  }

  get City(): FormControl {
    return this.profileForm.get('city') as FormControl;
  }

  get Gender(): FormControl {
    return this.profileForm.get('gender') as FormControl;
  }

  get Country(): FormControl {
    return this.profileForm.get('country') as FormControl;
  }
}

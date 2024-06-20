import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/User';
import { UsersComponent } from '../users.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  userForm!: FormGroup;
  @Input() selectedUserId: number | null = null;
  selectedFile!: File;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usersComponent: UsersComponent
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnChanges() {
    this.userFormCreate();
    this.getDetailUser();
  }

  userFormCreate() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      profileImage: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  getDetailUser() {
    if (this.selectedUserId !== null) {
      this.http.getById<User>(`user`, this.selectedUserId, (res) => {
        this.userForm.patchValue({
          name: res.name,
          profileImage: res.profileImage,
          email: res.email,
          country: res.country,
          city: res.city,
        });
        this.Gender.patchValue(res.gender);
      });
    }
  }

  getUsers() {
    this.http.get<User[]>('users', (res) => {
      this.users = res;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.files[0] as File;
  }

  userFormSubmit() {
    this.confirmationService.confirm({
      message: 'Bu Kullanıcıyı Güncellemek İstediğinize Emin Misiniz?',
      header: 'Kullanıcı Güncelleme',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Güncellendi',
          detail: 'Kullanıcı Güncelleme İşlemi Başarılı',
        });

        const formData = new FormData();
        formData.append('name', this.Name.value);
        formData.append('profileImage', this.selectedFile);
        formData.append('email', this.Email.value);
        formData.append('gender', this.Gender.value);
        formData.append('country', this.Country.value);
        formData.append('city', this.City.value);

        this.http.put<FormData>(
          `user`,
          Number(this.selectedUserId),
          formData,
          (res) => {
            this.usersComponent.userSharedVisible = false;
            window.location.reload();
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kullanıcı Güncelleme İşlemi İptal Edildi',
        });
      },
    });
  }

  get Name(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  get Email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  get Gender(): FormControl {
    return this.userForm.get('gender') as FormControl;
  }

  get Country(): FormControl {
    return this.userForm.get('country') as FormControl;
  }

  get City(): FormControl {
    return this.userForm.get('city') as FormControl;
  }
}

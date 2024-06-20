import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Blog } from 'src/app/models/Blog';
import { HttpClientService } from 'src/app/services/http-client.service';
import { BlogsComponent } from '../blogs.component';
import { User } from 'src/app/models/User';

@Component({
  selector: 'blog-shared',
  templateUrl: './blog-shared.component.html',
  styleUrls: ['./blog-shared.component.scss'],
})
export class BlogSharedComponent {
  blogForm!: FormGroup;
  @Input() selectedBlogId: number | null = null;
  selectedFile!: File;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private blogsComponent: BlogsComponent
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnChanges() {
    this.blogFormCreate();
    if (this.selectedBlogId !== null && this.selectedBlogId !== undefined) {
      this.getDetailBlog();
    }
  }

  blogFormCreate() {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getDetailBlog() {
    if (this.selectedBlogId !== null && this.selectedBlogId !== undefined) {
      this.http.getById<Blog>(`blog`, this.selectedBlogId, (res) => {
        this.blogForm.patchValue({
          title: res.title,
          description: res.description,
          city: res.city,
        });
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

  blogFormSubmit(blogId?: number) {
    if (blogId !== undefined) {
      this.confirmationService.confirm({
        message: 'Bu Bloğu Güncellemek İstediğinize Emin Misiniz?',
        header: 'Blog Güncelleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Güncellendi',
            detail: 'Blog Güncelleme İşlemi Başarılı',
          });

          let userName: string = '';

          const userId = localStorage.getItem('userId');
          this.users.forEach((user) => {
            if (user.id === Number(userId)) {
              userName = user.name;
            }
          });

          const formData = new FormData();
          formData.append('title', this.Title.value);
          formData.append('description', this.Description.value);
          formData.append('image', this.selectedFile);
          formData.append('city', this.City.value);
          formData.append('author', userName);

          this.http.put<FormData>(`blog`, blogId, formData, () => {
            this.blogsComponent.blogSharedVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Blog Güncelleme İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message: 'Bir Blog Eklemek İstediğinize Emin Misiniz?',
        header: 'Blog Ekleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Eklendi',
            detail: 'Blog Ekleme İşlemi Başarılı',
          });

          let userName: string = '';

          const userId = localStorage.getItem('userId');
          this.users.forEach((user) => {
            if (user.id === Number(userId)) {
              userName = user.name;
            }
          });

          const formData = new FormData();
          formData.append('title', this.Title.value);
          formData.append('description', this.Description.value);
          formData.append('image', this.selectedFile);
          formData.append('city', this.City.value);
          formData.append('author', userName);

          this.http.post<FormData>(`blogCreate`, formData, () => {
            this.blogsComponent.blogSharedVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Blog Ekleme İşlemi İptal Edildi',
          });
        },
      });
    }
  }

  get Title(): FormControl {
    return this.blogForm.get('title') as FormControl;
  }

  get City(): FormControl {
    return this.blogForm.get('city') as FormControl;
  }

  get Description(): FormControl {
    return this.blogForm.get('description') as FormControl;
  }
}

import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService {
  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  delete(message: string, header: string, path: string, blogId: number) {
    this.confirmationService.confirm({
      message: `${message} Silmek İstediğinize Emin Misiniz?`,
      header: `${header} Silme`,
      icon: 'fa-solid fa-trash',
      accept: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Silindi',
          detail: `${header} Silme İşlemi Başarılı Bir Şekilde Yapıldı Sayfa 3 Saniye İçinde Yenilenecektir`,
        });
        this.http.delete(path, blogId, (res) => {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'İptal Edildi',
          detail: `${header} Silme İşlemi İptal Edildi`,
        });
      },
    });
  }
}

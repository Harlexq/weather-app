import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/User';
import { HttpClientService } from 'src/app/services/http-client.service';
import { CustomDialogService } from 'src/app/services/primeng/cutom-dialog.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService],
})
export class UsersComponent {
  users: User[] = [];
  user: User | null = null;
  userSharedVisible: boolean = false;
  selectedUserId: number | null = null;

  constructor(
    private http: HttpClientService,
    private customDialogService: CustomDialogService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  formatPublicationDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  getUsers() {
    this.http.get<User[]>('users', (res) => {
      this.users = res;
    });
  }

  userShared(userId: number) {
    this.selectedUserId = userId;
    this.userSharedVisible = !this.userSharedVisible;
  }

  userDelete(userId: number) {
    this.customDialogService.delete('Kullanıcıyı', 'Kullanıcı', 'user', userId);
  }
}

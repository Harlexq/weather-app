import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'home-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: User[] = [];
  totalUserCount: number = 0;
  newUserCountDay: number = 0;
  newUserCountWeek: number = 0;
  newUserCountMonth: number = 0;
  data: any;

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>(`users`, (res) => {
      this.users = res;
      this.totalUserCount = this.users.length;
      this.calculateNewUsers();
      this.chartUsers();
    });
  }

  calculateNewUsers() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    this.newUserCountDay = this.users.filter(
      (user) => new Date(user.createdDate) >= today
    ).length;
    this.newUserCountWeek = this.users.filter(
      (user) => new Date(user.createdDate) >= oneWeekAgo
    ).length;
    this.newUserCountMonth = this.users.filter(
      (user) => new Date(user.createdDate) >= oneMonthAgo
    ).length;
  }

  chartUsers() {
    this.data = {
      labels: [
        'Toplam Kullanıcılar',
        'Bugün Eklenenler',
        'Son Bir Haftada Eklenenler',
        'Son Bir Ayda Eklenenler',
      ],
      datasets: [
        {
          label: 'Kullanıcı Sayısı',
          data: [
            this.totalUserCount,
            this.newUserCountDay,
            this.newUserCountWeek,
            this.newUserCountMonth,
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(255, 159, 64)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}

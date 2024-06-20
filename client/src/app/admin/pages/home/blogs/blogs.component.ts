import { Component } from '@angular/core';
import { Blog } from 'src/app/models/Blog';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'home-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {
  blogs: Blog[] = [];
  totalBlogCount: number = 0;
  newBlogCountDay: number = 0;
  newBlogCountWeek: number = 0;
  newBlogCountMonth: number = 0;
  data: any;

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.http.get<Blog[]>(`blogs`, (res) => {
      this.blogs = res;
      this.totalBlogCount = this.blogs.length;
      this.calculateNewBlogs();
      this.chartBlogs();
    });
  }

  calculateNewBlogs() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    this.newBlogCountDay = this.blogs.filter(
      (blog) => new Date(blog.publicationDate) >= today
    ).length;
    this.newBlogCountWeek = this.blogs.filter(
      (blog) => new Date(blog.publicationDate) >= oneWeekAgo
    ).length;
    this.newBlogCountMonth = this.blogs.filter(
      (blog) => new Date(blog.publicationDate) >= oneMonthAgo
    ).length;
  }

  chartBlogs() {
    this.data = {
      labels: [
        'Toplam Blog',
        'Bugün Eklenenler',
        'Son Bir Haftada Eklenenler',
        'Son Bir Ayda Eklenenler',
      ],
      datasets: [
        {
          label: 'Blog Sayısı',
          data: [
            this.totalBlogCount,
            this.newBlogCountDay,
            this.newBlogCountWeek,
            this.newBlogCountMonth,
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

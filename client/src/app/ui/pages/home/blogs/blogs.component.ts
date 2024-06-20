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

  constructor(private http: HttpClientService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  formatPublicationDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  getBlogs() {
    this.http.get<Blog[]>('blogs', (res) => {
      this.blogs = res;
    });
  }
}

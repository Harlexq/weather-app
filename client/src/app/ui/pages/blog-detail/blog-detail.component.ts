import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/Blog';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent {
  blog: Blog | null = null;

  constructor(private http: HttpClientService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.getById<Blog>('blog', id, (res) => {
      this.blog = res;
    });
  }

  formatPublicationDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
}

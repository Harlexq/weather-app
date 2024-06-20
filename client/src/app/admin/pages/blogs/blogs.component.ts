import { Component } from '@angular/core';
import { Blog } from 'src/app/models/Blog';
import { HttpClientService } from 'src/app/services/http-client.service';
import { CustomDialogService } from 'src/app/services/primeng/cutom-dialog.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  providers: [DialogService],
})
export class BlogsComponent {
  blogs: Blog[] = [];
  blog: Blog | null = null;
  display: boolean = false;
  blogSharedVisible: boolean = false;
  selectedBlogId: number | null = null;

  constructor(
    private http: HttpClientService,
    private customDialogService: CustomDialogService,
    public dialogService: DialogService
  ) {}

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

  blogRead(blogId: number) {
    this.http.getById<Blog>('blog', blogId, (res) => {
      this.blog = res;
      this.display = true;
    });
  }

  blogShared(blogId?: number) {
    this.selectedBlogId = blogId || null;
    this.blogSharedVisible = !this.blogSharedVisible;
  }

  blogDelete(blogId: number) {
    this.customDialogService.delete('Bloğu', 'Blog', 'blog', blogId);
  }
}

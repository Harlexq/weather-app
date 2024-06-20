import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
})
export class MainButtonComponent {
  @Input({ required: true }) content: string = '';
  @Input() path: string = '';
  @Input() icon: string = '';
  @Input() disabed: boolean = false;
}

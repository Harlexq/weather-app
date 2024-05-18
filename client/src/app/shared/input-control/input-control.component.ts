import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
})
export class InputControlComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() inputId: string = '';
  @Input() labelName: string = '';
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) fb!: FormControl;
}

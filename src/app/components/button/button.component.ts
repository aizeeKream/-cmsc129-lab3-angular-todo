import { Component, EventEmitter,Input, Output} from '@angular/core';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() color!: string;
  @Input() text!: string;
  @Output() addClick = new EventEmitter();
  @Output() editClick = new EventEmitter();

  onClick() {
    this.addClick.emit();
  }


}

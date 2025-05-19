import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { UiService } from '../../services/ui.service';
import {Subscription} from 'rxjs';
import {Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = "My to-do List"
  showAddTask: boolean = false;
  subscription!: Subscription;
  color: any;
  isEdit!: boolean ;


  constructor(private uiService:UiService, private router:Router){
      this.subscription = this.uiService.onToggleAddTask().subscribe((value) => {
      this.showAddTask = value;
  });
  }
  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string){
    return this.router.url == route;
  }


}

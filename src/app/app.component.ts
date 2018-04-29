import { Component ,OnInit} from '@angular/core';
import { CustomComponent, ClassAbcDescriptor } from './CustomDecorator';
@CustomComponent({
  url: '/books'
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'app';

  constructor(){
  }
  ngOnInit(){

    alert('this.url' + this['url']);
  }
}

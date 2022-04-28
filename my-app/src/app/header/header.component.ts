import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SingleSpaService } from 'src/service/single-spa.service';

@Component({
  selector: 'my-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('headerContainer', {static: true}) private headerContainer!: ElementRef;

  constructor(private service: SingleSpaService) {
  }

  ngOnInit(): void {
    this.service.mount('header', this.headerContainer.nativeElement).subscribe();
  }
}

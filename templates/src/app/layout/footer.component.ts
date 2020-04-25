import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      ✍🏼Made by <a href="https://twitter.com/albertobasalo">Alberto Basalo</a> @
      <a href="https://angular.builders.com"> Angular.Builders</a> -
      <a routerLink="about-us">🏢 About us</a>
    </footer>
  `,
  styles: [],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

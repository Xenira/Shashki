import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  styleUrls: ['./theme-button.component.scss']
})
export class ThemeButtonComponent implements OnInit {

  themes: { name: string, css?: string }[] = [
    { name: 'Light', css: 'light-theme' },
    { name: 'Dark Theme' },
    { name: 'Hello Darkness, My Old Friend', css: 'darker-theme' }
  ];

  body: HTMLBodyElement;

  constructor() { }

  ngOnInit() {
    this.body = document.getElementsByTagName('body')[0];
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme);
    }
  }

  setTheme(css: string) {
    this.body.classList
      .remove(...this.themes.filter(t => t.css).map(t => t.css));

    this.body.classList.add(css);
    localStorage.setItem('theme', css);
  }

}

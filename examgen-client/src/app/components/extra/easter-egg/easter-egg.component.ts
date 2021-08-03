import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-easter-egg',
  templateUrl: './easter-egg.component.html',
  styleUrls: ['./easter-egg.component.scss']
})
export class EasterEggComponent implements OnInit {

  constructor(private pageTitle: Title) {
  }

  ngOnInit(): void {
    this.pageTitle.setTitle("~ You found a Capybara! ~")
  }

}

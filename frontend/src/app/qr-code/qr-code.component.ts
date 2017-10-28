import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as QRious from 'qrious';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  @ViewChild('qr') qr;
  @Input() text;

  constructor() { }

  ngOnInit() {
    console.log(this.qr);
    const code = new QRious({
      element: this.qr.nativeElement,
      value: this.text
    });
  }

}

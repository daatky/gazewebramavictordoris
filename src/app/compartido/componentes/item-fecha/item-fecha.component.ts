import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-fecha',
  templateUrl: './item-fecha.component.html',
  styleUrls: ['./item-fecha.component.scss']
})
export class ItemFechaComponent implements OnInit {
  @Input() fecha:Date
  constructor() { }

  ngOnInit(): void {
  }

}

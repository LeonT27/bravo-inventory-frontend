import { Component, OnInit } from '@angular/core';

import { ProductCommand } from './productCommand';
import { ProductService } from '../product.service';

import { Unit } from './unit';
import { UnitService } from './unit.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  units: Unit[] = [];

  constructor(
    private productService: ProductService, 
    private unitService: UnitService) { }

  ngOnInit(): void {
    this.unitService.getUnits().subscribe({
      next: units => {
      this.units = units;
      }
    });
  }

  add(productCommand: ProductCommand): void {
    if (!productCommand) { return; }
    this.productService.addProduct(productCommand).subscribe();
  }

  toInt(s: string): number {
    return parseInt(s);
  }

}

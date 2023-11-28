import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  cartList!:any
  loading: boolean = false
  public skeleton = new Array(20).fill(0);

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loading = true
    this.cartService.getCartItems().subscribe((data) => {
      this.cartList = data?.userCart?.cart_books  || []
      console.log(data?.userCart?.cart_books)
      this.loading=false
    })
  }


}

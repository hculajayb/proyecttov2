import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

//window.paypal
declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {
  @Input()
  order!:Order;

  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private router:Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'CAD',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          // Simular la aprobación del pago
          self.order.paymentId = 'SIMULATED_PAYMENT_ID'; // Simular un ID de pago
          self.orderService.pay(self.order).subscribe(
            {
              next: (orderId) => {
                self.cartService.clearCart();
                self.router.navigateByUrl('/track/' + orderId);
                self.toastrService.success(
                  'Pago aprobado con éxito',
                  'Success'
                );
              },
              error: (error) => {
                self.toastrService.error('Error al guardar el pago', 'Error');
              }
            }
          );
        },

        onError: (err: any) => {
          self.toastrService.error('Pago fallido', 'Error');
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);

  }

}

import Stripe from 'stripe';
import { All, Injectable } from '@nestjs/common';


const stripe = new Stripe('sk_test_51IUL0ZLnExjIVJcojZq1EQ82kFJ7i5TN13Sh98VaK9yLX8R75ZOPVt08535LQFRTzW9hsNZDg9reWLhESeicdcTu00ak7gVZyY', {
    apiVersion: '2022-11-15',
  });
//   pk_test_51IUL0ZLnExjIVJco3CPRbrYaiENzxKGsbEUeA5S5nVxzQHca4fcQ2V7qVbwSqdxFmuAdVBfwDCI0nAMdSLAQsm1X00enddSEAf

@Injectable()
export class PaymentsService {
}
export class ReturnsResponseDto {
  id: string;
  reason: string;
  orderProducts?: Array<string>;
  status: string;
  userId: string;
  createdAt: Date;

  constructor(
    id: string,
    reason: string,
    orderProducts: Array<string>,
    status: string,
    userId: string,
    createdAt?: Date,
  ) {
    this.id = id;
    this.orderProducts = orderProducts;
    this.reason = reason;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}

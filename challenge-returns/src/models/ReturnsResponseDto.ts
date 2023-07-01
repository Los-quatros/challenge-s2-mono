
export class ReturnsResponseDto {
    id : string;
    reason : string;
    orderProducts? : Array<string>;
    status : string;
    userId : string;
    constructor(id : string, reason : string, orderProducts : Array<string>, status : string, userId : string){
        this.id = id;
        this.orderProducts = orderProducts;
        this.reason = reason;
        this.status = status;
        this.userId = userId;
    }
}


export enum AssociationType {
    Product = 'product',
    User = 'user',
};

export class ImagesAssociatedOn {
    id : string;
    type : AssociationType;
    constructor(id :string, type:AssociationType){
        this.id = id;
        this.type = type;
    }
}
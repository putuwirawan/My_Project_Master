export interface LatestArticleModel {
  originalPrice: string | null;
  promoPrice: string | null;
  salesPrice: string | null;
  salesPriceDocument: string | null;
  stock: number;
  weight: string | null;
}
export interface CartModel {
  articleDescription: string;
  articleId: string;
  code: string;
  createdDate: Date;
  currencyId: string;
  deletedDate: Date | null;
  discount: string;
  gross: string;
  id: string;
  imagePath: string;
  isCurrentStateValid: boolean;
  latestArticleData: LatestArticleModel;
  net: string;
  price: string;
  priceRef: string | null;
  qty: number;
  remarks: string | null;
  shopcartId: string;
  smallThumbPath: string;
  thumbPath: string;
  totalWeight: number;
  type: string;
  updatedDate: string;
  version: number;
  warehouseAddress1: string;
  warehouseAddress2: string;
  warehouseCode: string;
  warehouseDescription: string;
  warehouseId: string;
  warehouseSubDistrict: number;
  weight: string;
}
export interface CartState {
    carts:CartModel[];
    cartsCount:number
  
  }
  export const ADD_CART = 'ADD_CART';


  export interface AddCart {
    type: typeof ADD_CART;
    data: CartModel[];
    count:number
  }

  export type CartAction = AddCart 
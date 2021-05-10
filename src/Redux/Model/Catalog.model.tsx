export interface VariantType {
  id: string;
  variantCode: string;
  variantDescription: string;
  smallThumbPath: string;
  colorCode: string;
  colorDescription: string;
  styleId: string;
  styleCode: string;
  styleDescription: string;
  styleCreatedDate: string;
  variantId: string;
  imagePath: string;
  imageThumbPath: string;
  imageSmallThumbPath: string;
}
export interface ArticleType {
  id: string;
  articleCode: string;
  articleBarcode: string;
  articleDescription: string;
  price: string;
  weight: string;
  sizeCode: string;
  sizeDescription: string;
}
export interface PriceType {
  priceDocument: string;
  priceType: string;
  price: string;

}
export interface ItemListType {
  articleId: string;
  warehouseId: string;
  code: string;
  description: string;
  stock: number;
  normalPrice: PriceType | null;
  promoPrice: PriceType | null;
  salesPrice: string | null;
  salesPriceDocument: string | null;
}
export interface ImageType {
  id: string;
  path: string;
  thumbPath: string;
  smallThumbPath: string;
  default: boolean;
}
export const initItemList: ItemListType = {
  articleId: '',
  warehouseId: '',
  code: '',
  description: '',
  stock: 0,
  normalPrice: null,
  promoPrice: null,
  salesPrice: null,
  salesPriceDocument: null,
};

export interface VariantType {
  id: string;
  variantCode: string;
  variantDescription: string;
  smallThumbPath: string;
  colorCode: string;
  colorDescription: string;
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
export interface ItemListType {
  articleId: string;
  warehouseId: string;
  code: string;
  description: string;
  stock: number;
  normalPrice: string | null;
  promoPrice: string | null;
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
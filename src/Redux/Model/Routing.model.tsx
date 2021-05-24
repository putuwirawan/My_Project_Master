import { CartModel } from "."

export type LoginParam = {
    SplashScreen:  undefined;
    SignInScreen:  undefined;
    SignUpScreen: undefined;
  }
  
  export type DashboardParam = {
    Page1:  undefined;
    Home: undefined;
    User: undefined;
    Feed: undefined;
    Cart: {carts:CartModel[],count:number};
    Chat: undefined;
    MainMenu:  undefined;
    Product:  undefined;
    ProductDetail: {data:any} ;
    CheckOut:{data:any}
  }
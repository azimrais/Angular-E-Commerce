export interface SignUp {
  name: string;
  password: string;
  email: string;
}
export interface SignIn {
  password: string;
  email: string;
}
export interface product {
  productId: any;
  quantity: undefined | number;
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id: number;
}
export interface cart {
  quantity:number;
  name: string;
  price: number ;
  category: string;
  color: string;
  userId: number;
  description: string;
  image: string;
  id: number|undefined;
  productId: number;
}
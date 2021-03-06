import L from '../../common/logger';

let id = 1;
interface Product {
  id: number;
  name: string;
  customerPrice: number;
  cost: number;
}

interface CartProduct {
  productId: number;
  quantity: number;
}

interface CartProductSummary {
  quantity: number;
  name: string;
  unitPrice: string;
  totalPrice: string;
}

export interface CartEntry {
  products: CartProduct[];
}

interface Cart {
  products: CartProductSummary[];
  total: string;
}

const products: Product[] = [
  { id: id++, name: 'Soup', customerPrice: 199, cost: 186 },
  { id: id++, name: 'Bread', customerPrice: 87, cost: 21 },
  { id: id++, name: 'Cheese', customerPrice: 275, cost: 234 },
  { id: id++, name: 'Milk', customerPrice: 67, cost: 61 },
];

export class ProductsService {
  all(): Promise<Product[]> {
    L.info(products, 'fetch all products');
    return Promise.resolve(products);
  }

  byId(id: number): Promise<Product> {
    L.info(`fetch product with id ${id}`);
    return this.all().then((r) => r[id - 1]);
  }

  create(name: string, customerPrice: number, cost: number): Promise<Product> {
    L.info(`create product with name ${name}`);
    const product: Product = {
      id: id++,
      name,
      customerPrice,
      cost,
    };
    products.push(product);
    return Promise.resolve(product);
  }

  cartSummary(cartProducts: CartProduct[] = []): Promise<Cart> {
    const cart: Cart = {
      products: [],
      total: '',
    };
    let total = 0;
    cartProducts.forEach((cartPrd) => {
      if (cartPrd.productId <= products.length && cartPrd.productId >= 1) {
        const p = products[cartPrd.productId - 1];
        const totalPrice = p.customerPrice * cartPrd.quantity;
        cart.products.push({
          name: p.name,
          quantity: cartPrd.quantity,
          unitPrice: `$${p.customerPrice}`,
          totalPrice: `$${totalPrice}`,
        });
        total += totalPrice;
      }
    });
    cart.total = `$${total}`;
    return Promise.resolve(cart);
  }
}

export default new ProductsService();

import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class CartProduct {
  @PrimaryColumn({ type: 'int', generated: 'increment' })
  id: number;

  @ManyToOne(() => ShoppingCart, (cart) => cart.id)
  shoppingCart: ShoppingCart;
  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;
}

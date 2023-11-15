import { CartProduct } from 'src/cart-product/entities/cart-product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.shoppingCart, { cascade: true })
  @JoinColumn()
  user: User;
  @OneToMany(() => CartProduct, (CartProduct) => CartProduct.shoppingCart, {
    eager: true,
  })
  cartProducts: CartProduct[];
}

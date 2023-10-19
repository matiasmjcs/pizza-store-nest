import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isVerified: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.user, {
    eager: true,
  })
  @JoinColumn()
  shoppingCart: ShoppingCart;
}

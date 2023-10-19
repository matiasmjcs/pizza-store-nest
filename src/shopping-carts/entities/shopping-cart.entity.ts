import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Product, (product) => product.shoppingCarts, {
    eager: true,
  })
  @JoinTable()
  products: Product[];
}

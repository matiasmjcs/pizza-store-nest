import { Category } from 'src/categories/entities/category.entity';
import { ShoppingCart } from 'src/shopping-carts/entities/shopping-cart.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Category, (category) => category.id, {
    eager: true,
  })
  category: Category;

  @ManyToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.products)
  shoppingCarts: ShoppingCart[];
}

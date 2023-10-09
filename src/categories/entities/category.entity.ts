import { Product } from "src/products/entities/product.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]

    @DeleteDateColumn()
    deletedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ unique: true, nullable: false })
  phone_number: string;

  @Column({ unique: true, nullable: false })
  email_address: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];
}

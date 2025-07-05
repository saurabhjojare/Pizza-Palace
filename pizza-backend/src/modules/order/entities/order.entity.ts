import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { OrderLineEntity } from '../../order-line/entities/order-line.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_amount: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  order_time: Date;

  @Column({ type: 'int', nullable: false })
  customer_id: number;

  @Column({ type: 'varchar', nullable: false })
  delivery_address: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.order, {
    cascade: true,
  })
  orderLines: OrderLineEntity[];
}

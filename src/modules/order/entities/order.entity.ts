import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { OrderLineEntity } from './order-line.entity';

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

  @Column({ type: 'int', nullable: true })
  customer_id: number;

  @Column({ type: 'varchar', nullable: false })
  delivery_address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.order, {
    cascade: true,
  })
  orderLines: OrderLineEntity[];
}

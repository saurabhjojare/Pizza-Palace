import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { OrderEntity } from '../../order/entities/order.entity';
import { PizzaEntity } from '../../pizza/entities/pizza.entity';

@Entity('order_line')
export class OrderLineEntity {
  @PrimaryGeneratedColumn()
  orderline_id: number;

  @Column({ nullable: false })
  order_id: number;

  @Column({ nullable: true })
  pizza_id: number;

  @Column({ nullable: false })
  size: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => OrderEntity, (order) => order.orderLines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => PizzaEntity, (pizza) => pizza.pizza_id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'pizza_id' })
  pizza: PizzaEntity;
}

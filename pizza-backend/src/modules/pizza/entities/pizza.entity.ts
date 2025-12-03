import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pizza')
export class PizzaEntity {
  @PrimaryGeneratedColumn()
  pizza_id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: ['Vegetarian', 'Non-Vegetarian'],
    nullable: false,
  })
  type: string;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  regularPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  mediumPrice: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  largePrice: number;
}

import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Borrow } from "./Borrow.entity";

@Entity({ name: 't_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // Phone number 이용해서 중복 구분
  @Column({ length: 16, name: 'phone_number', nullable: false, unique: true })
  phoneNumber: string;

  @Column({ length: 32, name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Borrow, borrow => borrow.user)
  borrowList: Borrow[]
}
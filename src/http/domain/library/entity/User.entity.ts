import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import expect from 'expect';
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
  borrowList: Borrow[];

  /**
   * Typeorm entitty 에서 constructor 를 구현하기에는
   * 여러가지 제약 사항이 존재하여, 불가피하게 builder 패턴으로 구현함
   */
  static Builder = class {
    phoneNumber: string;
    name: string;
    
    public setPhoneNumber(phoneNumber: string) {
      this.phoneNumber = phoneNumber;
      return this;
    }
    
    public setName(name: string) {
      this.name = name;
      return this;
    }

    public build(): User {
      const { name, phoneNumber } = this;
      expect(name).not.toBeFalsy();
      expect(phoneNumber).not.toBeFalsy();
      const user = new User();
      user.name = name;
      user.phoneNumber = phoneNumber;
      return user;
    }
  }
}
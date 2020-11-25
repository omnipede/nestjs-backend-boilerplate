import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import expect from 'expect';
import { Borrow } from "./Borrow.entity";

@Entity({ name: 't_book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Borrow, borrow => borrow.book)
  borrowList: Borrow[];

  // Builder
  static Builder = class {
    name: string;
    setName(name: string) {
      this.name = name;
      return this;
    }

    build(): Book {
      const { name } = this;
      expect(name).not.toBeFalsy();
      const book = new Book();
      book.name = name;
      return book;
    }
  }
}
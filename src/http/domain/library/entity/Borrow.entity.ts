import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import expect from 'expect';
import { Book } from "./Book.entity";
import { User } from "./User.entity";

/**
 * User <-> Book mapping
 */
@Entity({ name: 't_borrow' })
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.borrowList, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book, book => book.borrowList, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  static Builder = class {
    user: User;
    book: Book;

    public setUser(user: User) {
      this.user = user;
      return this;
    }

    public setBook(book: Book) {
      this.book = book;
      return this;
    }

    public build(): Borrow {
      const { user, book } = this;
      expect(user).not.toBeFalsy();
      expect(book).not.toBeFalsy();
      const borrow = new Borrow();
      borrow.user = user;
      borrow.book = book;
      return borrow;
    }
  }
}
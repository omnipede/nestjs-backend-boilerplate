import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";

/**
 * User <-> Book mapping
 */
@Entity({ name: 't_borrow' })
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.borrowList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book, book => book.borrowList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  constructor(user: User, book: Book) {
    this.user = user;
    this.book = book;
  }
}
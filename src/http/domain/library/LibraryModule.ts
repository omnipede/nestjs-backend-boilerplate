import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controller/UserController";
import { Book } from "./entity/Book.entity";
import { Borrow } from "./entity/Borrow.entity";
import { UserRepository } from "./repository/UserRepository";
import { BookService } from "./service/BookService";
import { UserService } from "./service/UserService";

@Module({
  controllers: [
    UserController,
  ],
  providers: [
    BookService,
    UserService,
  ],
  imports: [
    TypeOrmModule.forFeature([Book, UserRepository, Borrow])
  ]
})
export class LibraryModule {}
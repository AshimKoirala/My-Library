import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  books: { title: string; author: string }[] = [];
  newBook = { title: "", author: "" };

  editingIndex: number | null = null;
  editedBook = { title: "", author: "" };

  constructor() {
    this.loadBooks();
  }

  addBook() {
    if (this.newBook.title && this.newBook.author) {
      this.books.push({ ...this.newBook });
      this.newBook = { title: "", author: "" };
      this.saveBooks();
    }
  }

  removeBook(index: number) {
    this.books.splice(index, 1);
    this.saveBooks();
  }

  editBook(index: number) {
    this.editingIndex = index;
    this.editedBook = { ...this.books[index] };
  }

  saveEdit(index: number) {
    this.books[index] = { ...this.editedBook };
    this.editingIndex = null;
    this.saveBooks();
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  saveBooks() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  loadBooks() {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    }
  }
}

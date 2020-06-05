export class Entry {
  private url: string;
  private author: string;

  constructor(url: string, author: string) {
    this.url = url;
    this.author = author;
  }

  getUrl(): string {
    return this.url;
  }

  getAuthor(): string {
    return this.author;
  }
}
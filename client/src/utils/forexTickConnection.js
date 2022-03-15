export class ForexTickConnection {
  constructor(symbol) {
    this.connection = new EventSource(
      `http://localhost:5000/forex/tick?symbol=${symbol}`
    );
  }

  closeConnection() {
    this.connection.close();
    //ignore
  }
}

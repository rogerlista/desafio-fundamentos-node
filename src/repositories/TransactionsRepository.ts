import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const filterTypes = (
      transactions: Transaction[],
      query: string,
    ): Transaction[] => {
      return transactions.filter(({ type }) => type === query);
    };

    const reducer = (accumulator: number, transaction: Transaction): number =>
      accumulator + transaction.value;

    const income = filterTypes(this.transactions, 'income').reduce(reducer, 0);
    const outcome = filterTypes(this.transactions, 'outcome').reduce(
      reducer,
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

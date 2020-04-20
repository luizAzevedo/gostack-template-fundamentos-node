import Transaction from '../models/Transaction';

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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
    const incomeTransactions = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (previousValue, transaction) => previousValue + transaction.value,
        0,
      );

    const outcomeTransactions = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (previousValue, transaction) => previousValue + transaction.value,
        0,
      );

    const balance: Balance = {
      income: incomeTransactions,
      outcome: outcomeTransactions,
      total: incomeTransactions - outcomeTransactions,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

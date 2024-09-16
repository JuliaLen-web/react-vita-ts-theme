export interface Transaction {
    id?: number;
    invoice?: number;
    buyer?: string;
    seller?: string;
    status?: string;
    payment?: string;
    date?: string;
    sum?: number;
}

export type Transactions = Transaction[]

export interface TransactionsState {
    transactions: [] | Transactions;
    loading: boolean;
    error: null | string;
}
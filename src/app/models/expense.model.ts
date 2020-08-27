export interface Expense {
    name: string,
    amount: number
}

export interface ExpensesTemplate {
    name: string,
    expenses: Array<Expense>
}

export interface Allowance {
    name: string,
    amount: number
}

export interface dbDayItem {
    allowances: Array<Allowance>,
    expenses: Array<Expense>,
    savings: number,
    date: string,
}
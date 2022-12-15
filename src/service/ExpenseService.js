import axios from "axios";

let URL = "http://localhost:8080/api/v1/expenses"


export default class ExpenseService {

    createExpense(expense) {
        console.log("Create Expense");

        return axios.post(URL, expense);
    }

    getExpenses() {
        return axios.get(URL);
    }

    getExpense(id) {
        return axios.get(URL + "/" + id);
    }

    updateExpense(id, expense) {
        return axios.put(URL + "/" + id, expense);
    }
  
    deleteExpense(id) {
        console.log("Delete Expense");
        return axios.delete(URL + "/" + id);
    }
}

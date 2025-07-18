import React, {useEffect, useState} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_URL } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';

import toast from 'react-hot-toast';4
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';


const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

    //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_URL.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data) {
        setExpenseData(response.data);
      }
    }
    catch(error){
      console.log("Something went wrong. Please try again.", error);
    }
    finally{
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation Checks
    if(!category.trim()){
      toast.error("Source is required");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be valid number greater than 0");
    }
    if(!date){
      toast.error("Date is required");
    }

    try{
      await axiosInstance.post(API_URL.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModel(false);
      toast.success("Income added successfully");
      fetchExpenseDetails();
    }
    catch (error){
      console.error("Error Adding Income:", error.response?.data?.message || error.message);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_URL.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null});
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    }
    catch(error){
      console.error("Error deleting expense:", error.response?.data?.message || error.message );
    }
  };

  useEffect(()=>{
    fetchExpenseDetails();
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className=''>
            <ExpenseOverview transactions={expenseData} onExpenseIncome={() => setOpenAddExpenseModel(true)}  />
          </div>
          <ExpenseList transactions={expenseData} onDelete={(id) => { setOpenDeleteAlert({ show: true, data: id });}} />
        </div>

        <Modal isOpen={openAddExpenseModel} onClose={() => setOpenAddExpenseModel(false)} title="Add Expense">
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal> 

        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null})} title="Delete Expense">
          <DeleteAlert content="Are you sure you want to delete this expense details" onDelete={() => deleteExpense(openDeleteAlert.data)} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
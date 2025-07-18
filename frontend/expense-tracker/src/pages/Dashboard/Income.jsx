import React, { useState, useEffect } from 'react'
import {API_URL} from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  //Get All Income Details
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_URL.INCOME.GET_ALL_INCOME}`
      );

      if(response.data) {
        setIncomeData(response.data);
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
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // Validation Checks
    if(!source.trim()){
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
      await axiosInstance.post(API_URL.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModel(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    }
    catch (error){
      console.error("Error Adding Income:", error.response?.data?.message || error.message);
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_URL.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null});
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    }
    catch(error){
      console.error("Error deleting income:", error.response?.data?.message || error.message );
    }
  };

  useEffect(() => {
    fetchIncomeDetails();

    return () => {
    }
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview transactions={incomeData} onAddIncome={()=> setOpenAddIncomeModel(true)} />
          </div>

          <IncomeList transactions={incomeData} onDelete={(id) => { setOpenDeleteAlert({show: true, data: id });}} />
        </div>

        <Modal isOpen={openAddIncomeModel} onClose={()=> setOpenAddIncomeModel(false)} title="Add Income">
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null})} title="Delete Income">
          <DeleteAlert content="Are you sure you want to delete this income details" onDelete={() => deleteIncome(openDeleteAlert.data)} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
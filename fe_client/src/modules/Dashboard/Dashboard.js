import React, { useState } from 'react';
import {addEmployee, listEmployee, deleteEmployee, updateEmployee} from '../../api/employee';
import Table from '../../components/Table';
import EmployeeModal from '../../components/EmployeeModal';
import ConfirmationModal from '../../components/ConfirmationModal';


const Dashboard = () => {

    const [employeeList, setEmployeeList] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [modalReadOnly, setModalReadOnly] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [popupVisibility, setPopupVisibility] = useState(false);
    const [popupData, setPopupData] = useState(null); 

    const filterOnSearch = ({id, name, email, address, age, mobile}) => {
        async function fetchList(){
            id = id || undefined;
            name = name || undefined;
            email = email || undefined;
            address = address || undefined;
            age = age || undefined;
            mobile =mobile || undefined;
            const result = await listEmployee({id, name, email, address, age, mobile});
            if (result.err) {
                return;
            }
            setEmployeeList(result);
        }
        fetchList();
    };
    

    async function addEmployeeRecord(data){
        const result = await addEmployee(data);
        if (result.err) {
            return {err: true, message: result.message?.response?.data?.details};
        }
        employeeList.push(data);
        setEmployeeList([...employeeList]);
        return {err: false};
    }

    async function updateEmployeeRecord(data, oldEmployeeId) {
        const result = await updateEmployee(data, oldEmployeeId);
        if (result.err) {
            return {err: true, message: result.message?.response?.data?.details};
        }
        const newList = employeeList.map(employee => {
            if (employee.id === oldEmployeeId) {
                return data;
            }
            return employee
        });
        setEmployeeList([...newList]);
        return {err: false};
    }

    async function deleteEmployeeRecord(employeeId) {
        const result = await deleteEmployee(employeeId);
        if (result.err) {
            alert(`Employee not removed: ${result.message?.response?.data?.details}`);
            closePopupActions();
            return;
        }
        const newList = employeeList.filter(emp => emp.id !== employeeId);
        setEmployeeList([...newList]);
        closePopupActions();
    }

    async function openModal(mode,employeeId = null) {
        const employeeData = employeeId ? employeeList.find(employee => employee.id === employeeId) : null;
        switch (mode) {
            case 'add':
                setModalReadOnly(false);
                setModalData(null);
                break;
            case 'update':
                setModalReadOnly(false);
                setModalData(employeeData);
                break;
            case 'view':
                setModalReadOnly(true);
                setModalData(employeeData);
                break;
            default:
                setModalReadOnly(false);
                setModalData(null);
                break;
        }
        setModalVisibility(true);
    }

    async function openConfirmationPopup(employeeId) {
        setPopupVisibility(true);
        setPopupData(employeeId);
    }

    const closePopupActions = () => {
        setPopupVisibility(false);
        setPopupData(null);
    }

    const closeModalActions = () => {
        setModalVisibility(false);
        setModalReadOnly(false);
        setModalData(null);
    }

    const handleEmployeeRecordChange = (action,data) => {
        switch (action) {
            case 'view': 
            case 'update': 
                openModal(action,data);
                break;
            case 'delete':
                openConfirmationPopup(data);
                break;
            default:
                openModal(action,data);
        }
    }



    return (
        <div>
            <p></p>
            {
                modalVisibility 
                ? <EmployeeModal 
                    data={modalData} 
                    readOnly={modalReadOnly} 
                    createAction={addEmployeeRecord}
                    updateAction={updateEmployeeRecord} 
                    closeModal={closeModalActions}
                    /> 
                : <></>    
            }

            {           
                popupVisibility 
                ? <ConfirmationModal 
                    data={popupData} 
                    confirmAction={(empId)=>deleteEmployeeRecord(empId)} 
                    closeModal={closePopupActions}
                    /> 
                : <></>    
            }

            <div className='container'>
                <button className='btn' onClick={() => openModal()}>+ Add Employee</button>
            </div>

            <Table employeeList={employeeList} userAction={handleEmployeeRecordChange} filterList={filterOnSearch}/>
        </div>
    );
}

export default Dashboard;
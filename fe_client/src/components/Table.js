import React, { useEffect, useState, useMemo } from'react';
import _ from 'lodash';
import '../styles/Table.scss';

const Table = ({employeeList, userAction, filterList}) => {
    
    const handleAction = (e, action, data) => {
        e.cancelBubble = true;
        e.stopPropagation();
        userAction(action, data);
    }

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');

    

    const debouncedFilterHandler = useMemo(() => {
        const dataFilterHandler = () => {
            const params = {id, name, email, address, age, mobile};
            filterList(params);
        }
        return _.debounce(dataFilterHandler, 400, {maxWait: 3});
    },[id, name, email, address, age, mobile, filterList]);

    useEffect(() => {
        debouncedFilterHandler();
        return () => {
            debouncedFilterHandler.cancel();
        }
      }, [id, name, email, address, age, mobile]);

    return (
        <>

            <table className='striped highlight centered container'>
                <thead>
                    <tr>
                        <td><input className='txt search' type='text' placeholder='ID' value={id} onInput={(e) => setId(e.target.value)}/></td>
                        <td><input className='txt search' type='text' placeholder='Name' value={name} onInput={(e) => setName(e.target.value)}/></td>
                        <td><input className='txt search' type='text' placeholder='Email' value={email} onInput={(e) => setEmail(e.target.value)}/></td>
                        <td><input className='txt search' type='number' placeholder='Age' value={age} onInput={(e) => setAge(e.target.value)}/></td>
                        <td><input className='txt search' type='text' placeholder='Address' value={address} onInput={(e) => setAddress(e.target.value)}/></td>
                        <td><input className='txt search' type='text' placeholder='Mobile' value={mobile} onInput={(e) => setMobile(e.target.value)}/></td>
                        <td colSpan={2}><i className='material-icons'>search</i></td>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Mobile</th>
                    </tr>
                </thead>
                {
                    employeeList.length > 0 
                    ? <tbody id='list-body'>
                    {employeeList.map(employee => (
                        <tr key={employee.id} onClick={() => userAction('view', employee.id)}>
                        <td>
                            {employee.id}
                        </td>
                        <td>
                            {employee.name}
                        </td>
                        <td>
                            {employee.email}
                        </td>
                        <td>
                            {employee.age}
                        </td>
                        <td className='truncate'>
                            {employee.address.length > 18 ?  `${employee.address.substring(0,18)}...` : employee.address}
                        </td>
                        <td>
                            {employee.mobile}
                        </td>
                        <td>
                            <button type='button' className='btn-edit row-buttons material-icons' onClick={(e) => handleAction(e, 'update', employee.id)}>create</button>
                        </td>
                        <td>
                            <button type='button' className='btn-delete row-buttons material-icons' onClick={(e) => handleAction(e, 'delete', employee.id)}>delete</button>
                        </td>
                    </tr>
                    ))}
                      </tbody>
                    : <tbody><tr><td colSpan={6}><div>Data not found</div></td></tr></tbody>
                }
            </table>
        </>
    );
};

export default Table;

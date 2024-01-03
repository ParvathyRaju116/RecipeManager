import React, { useEffect, useState } from 'react'
import { getAllUserssApi } from '../Services/Allapi'
import AdminHeader from '../Components/AdminHeader'
import { Table } from 'react-bootstrap'

function AllUsers() {
    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
        const response = await getAllUserssApi()
        setUsers(response.data)
        console.log(users);
        console.log(response);

    }

    useEffect(() => {
        getAllUsers()

    }, []);
  return (
    <div>
        <AdminHeader></AdminHeader>

       <div className='text-center mt-5' style={{overflowX:'scroll'}}>
<div className='text-center' ><h1>All Users</h1></div>
             <Table className='mt-5 ' striped bordered hover >
          <thead>
            <tr className='p-0'>
              <th>#</th>
              <th>Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
          {users && users.length > 0 ? (
  users.map((i, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{i._id}</td>
      <td>{i.userName}</td>
      <td>@{i.email}</td>
      <td>{i.bio}</td>
      <td>{i.dateOfBirth}</td>
      <td>{i.gender}</td>
    </tr>
  ))
) : (
  <></>
)}

          </tbody>
        </Table>
       </div>
    </div>
  )
}

export default AllUsers
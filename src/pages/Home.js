import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function Home() {

    const [users, setUsers]=useState([]);

    // const {id}=useParams();

    useEffect(()=>{
        console.log("Hey Everyone");
        loadUsers();
    }, []);

    const loadUsers=async()=>{
        const result=await axios.get("https://members-info-mgmt-backend-production.up.railway.app/users");
        console.log(result.data);
        setUsers(result.data);
    }

    const deleteUser=async(id)=>{
        await axios.delete(`https://members-info-mgmt-backend-production.up.railway.app/users/${id}`);
        loadUsers();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index)=>(
                                <tr>
                                    <th scope="row" key={index}>{index+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>
                                            View
                                        </Link>
                                        <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>
                                            Edit
                                        </Link>
                                        <button className='btn btn-danger mx-2' onClick={()=>deleteUser(user.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './UserModal';
import "../components/UserTable.css";
import "../components/Loading.css";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await fetch(`${API_URL}/${userId}`, { method: 'DELETE' });
      setUsers(users.filter((user) => user.id !== userId));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="card-outer">
      <div className="spinning-border"></div>
        <div className='card-inner'>
          <h1 style={{color:'white'}}>User Management</h1>
          <Link to="/create" className="btn btn-primary">Create User</Link>
          {loading ? (
            <div class="loader"></div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone no.</th>
                  <th>Website</th>
                  <th>Company Name</th>
                  <th>Address</th>
                  <th>Actions</th>

                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.company.name}</td>
                    <td>{user.address.street} , {user.address.city}</td>
                    <td>
                      <Link to={`/edit/${user.id}`} className="btn btn-warning">Edit</Link>
                      <button className="btn btn-danger" onClick={() => {
                          setSelectedUserId(user.id);
                          setShowModal(true);
                        }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {showModal && (
            <Modal closeModal={() => setShowModal(false)} confirmAction={() => handleDelete(selectedUserId)} />
          )}
        </div>
      </div>
      
  );
};

export default UserTable;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });
  const [errors, setErrors] = useState({});
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    setFormData(data);
  };

  const validateForm = () => {
    const { name, email, phone, address } = formData;
    const newErrors = {};
    if (!name || name.length < 3) newErrors.name = 'Name must be at least 3 characters.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email.';
    if (!phone || phone.length < 10) newErrors.phone = 'Invalid phone number.';
    if (!address.street || !address.city) newErrors.address = 'Street and City are required.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address') || name.includes('company')) {
      const [parent, child] = name.split('.');
      setFormData({ ...formData, [parent]: { ...formData[parent], [child]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const response = await fetch(`${API_URL}/${id || ''}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="container" style={{color:'white',border:'1px solid white',justifyContent:'center',padding:'20px'}}>
      <h1>{isEdit ? 'Edit User' : 'Create User'}</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
        <br/>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
        <br/>
        <label>Phone no.:</label>
        <input type="tel" name="phone no." value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <br/>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address.city} onChange={handleChange} />
        {errors.address && <p className="error">{errors.address}</p>}
        <br/>

        {/* Add other fields similarly */}

        <button type="submit" className="btn btn-success">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserForm;

import { Button, DatePicker, Input } from 'antd';
import CustomSelect from '../components/CustomSelect';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Add() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [productData, setProductData] = useState("");
  
  const onChange = (date, dateString) => {
    setProductData(dateString);
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    const data = { productName, productPrice, productType, productData };
    axios.post("http://localhost:3000/products", data)
      .then(res => {
        toast.success('Product added successfully!');
        setTimeout(() => {
          navigate("/");
        }, 800);
      })
      .catch(error => {
        toast.error('Failed to add product. Please try again.');
      });
  }
  
  return (
    <div className='flex items-center w-full h-full justify-center bg-sky-500'>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className='w-[600px] shadow h-[450px] bg-[#001529] border rounded-lg border-sky-500 p-[10px]'>
        <h1 className='text-center mx-auto text-white w-[150px] font text-[24px] my-[20px] highlight highlight-sky-500 highlight-variant-3'>Add Products</h1>
        <Input 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          type='text' 
          name='productName'  
          placeholder='Enter your product name' 
          size='large' 
          className='border text-[#001529] mb-[30px] focus:shadow-lg focus:shadow-blue-300  placeholder:text-[#001529] border-sky-500'/>
        <Input 
          value={productPrice} 
          onChange={(e) => setProductPrice(e.target.value)} 
          type='number' 
          name='productPrice'  
          placeholder='Enter your product price' 
          size='large' 
          className='border text-[#001529] focus:shadow-lg focus:shadow-blue-300  placeholder:text-[#001529] border-sky-500'/>
        <CustomSelect setProductType={setProductType} />
        <DatePicker 
          size='large' 
          className='mt-[30px] w-full' 
          placeholder='Enter date' 
          onChange={onChange} />
        <div className='w-[200px] mx-auto'>
          <Button size='large' type='primary' htmlType='submit' className='mt-[35px] w-[200px]'>
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Add;

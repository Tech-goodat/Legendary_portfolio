import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff, IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar, Container } from '@mui/material';

const SignUp = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    residence_country: '',
    city: '',
    mobile_number: '',  // Ensure this matches the backend field name
    password: '',
  });
  const [alertOpen, setAlertOpen] = useState(false); // State for the alert
  const navigate = useNavigate();

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create options for the fetch request
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    // Make the fetch request
    fetch('http://127.0.0.1:5555/user/signup', opts)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create account");
        }
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem('token', data.access_token); // Corrected token name
        sessionStorage.setItem('userId', data.id);

        // Show alert and navigate to login after a delay
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
          navigate('/login');
        }, 3000); // Adjust the time as needed
      })
      .catch((error) => {
        console.error('Error while creating account:', error);
      });
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Container>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        sx={{ position: 'absolute', top: '20%', left: '-50%', transform: 'translate(-50%, -50%)' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Account created Successfully!
        </Alert>
      </Snackbar>

      <div className='flex items-center justify-center'>
        <div className='w-[1100px] h-[500px] bg-[#fdfcfa] mt-[50px] rounded-xl grid grid-cols-5 gap-5'>
          <div className='border SignUpImage border-[#fffbeb] shadow-md my-5 mx-5 rounded-xl col-span-2'>
           
          </div>
          <div className='bg-white shadow-md my-5 mx-5 col-span-3 rounded-xl'>
            <div className="flex w-full items-center justify-center mt-4">
              <h1 className="font-bold text-xl">Let's Get Started</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid mt-4 ml-[65px] grid-cols-2 w-full gap-3">
                <div><p className="text-[12px]">First name</p></div>
                <div><p className="text-[12px]">Last name</p></div>
              </div>
              <div className="grid mt-2 grid-cols-2 w-full items-center justify-center gap-3">
                <input
                  className='flex p-1.5 ml-[60px] px-5 outline-none border text-[12px] rounded-lg w-[200px]'
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                />
                <input
                  className='flex p-1.5 px-5 outline-none border text-[12px] rounded-lg w-[200px]'
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
              <div className="flex mt-3 ml-[65px] w-full">
                <p className="text-[12px]">Email</p>
              </div>
              <div>
                <input
                  className='flex p-1.5 px-5 outline-none border text-[12px] rounded-lg w-[450px] mt-1 ml-[60px]'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="grid mt-4 ml-[65px] grid-cols-2 w-full gap-3">
                <div><p className="text-[12px]">Country of Residence</p></div>
                <div><p className="text-[12px]">City</p></div>
              </div>
              <div className="grid mt-2 grid-cols-2 w-full items-center justify-center gap-3">
                <input
                  className='flex p-1.5 ml-[60px] px-5 outline-none border text-[12px] rounded-lg w-[200px]'
                  type="text"
                  name="residence_country"
                  value={formData.residence_country}
                  onChange={handleChange}
                  placeholder="Select country"
                />
                <input
                  className='flex p-1.5 px-5 outline-none border text-[12px] rounded-lg w-[200px]'
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Select city"
                />
              </div>
              <div className="flex mt-3 ml-[65px] w-full">
                <p className="text-[12px]">Phone number</p>
              </div>
              <div>
                <input
                  className='flex p-1.5 px-5 outline-none border text-[12px] rounded-lg w-[450px] mt-1 ml-[60px]'
                  type="text"
                  name="mobile_number" // Ensure this matches the backend field name
                  value={formData.mobile_number}
                  onChange={handleChange}
                  placeholder="+123 456 789 123"
                />
              </div>
              <div className="flex mt-3 ml-[65px] w-full">
                <p className="text-[12px]">Password</p>
              </div>
              <div className='flex border rounded-lg ml-[60px] mt-1 w-[450px]'>
                <input
                  className='flex p-1.5 px-5 outline-none text-[12px]'
                  type={isPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                />
                <button type="button" onClick={togglePassword} className='mr-3 ml-[230px]'>
                  {isPassword ? <IoIosEyeOff /> : <FaEye />}
                </button>
              </div>
              <button
                className='flex items-center justify-center p-1.5 bg-[#ffd37c] text-[12px] rounded-lg w-[450px] mt-7 ml-[60px]'
                type="submit"
              >
                Get started <IoIosArrowRoundForward className='ml-2' size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;

import React from 'react'
import SideBar from '../SideBar/SideBar'
import './ChangePassword.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

const ChangePassword = () => {
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  const [lowerValidated, setLowerValidated]=useState(false);
  const [upperValidated, setUpperValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);
  const [specialValidated, setSpecialValidated]=useState(false);
  const [lengthValidated, setLengthValidated]=useState(false);
  const handleChange = (value) => {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})');

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));
  };

  const handleChangePassword = async () => {
    if (!lowerValidated || !upperValidated || !numberValidated || !specialValidated || !lengthValidated) {
      setMessage('Please ensure all password requirements are met before changing the password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
    const token = localStorage.getItem('auth-token');

    if (!token) {
      setMessage('You must be logged in to change your password.');
      return;
    }

    try{
      const response= await fetch('http://localhost:4000/change-password',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token, 
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      })

      const result = await response.json();
      if (result.success) {
        setMessage('Password changed successfully.');
      } else {
        setMessage(result.message || 'Failed to change password.');
      }
    }
    catch(err){
      setMessage('An error occurred while changing the password.');
    }
  }
  return (
    <>
    
     {localStorage.getItem('auth-token') && (
        <div className='myflex-container'>
          <div className='dum20'><SideBar /></div>
          <div className='dum80'>
          <form className='dum50 cp'>
  <div className="form-group mb-2">
  {message && (
            <div className='text-center mt-3'>
              <p style={{ color: '#ae432e' }}>{message} !!</p>
            </div>
          )}
    <label htmlFor="exampleInputPassword1">Current Password</label>
    <input type="password" className="form-control mt-1" id="exampleInputPassword1" placeholder="" 
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)} />
  </div>
  <div className="form-group mb-2">
    <label htmlFor="exampleInputPassword2">New Password</label>
    <input type="password" className="form-control mt-1" id="exampleInputPassword2" placeholder="" 
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          handleChange(e.target.value); // Call handleChange here
        }} />
  </div>
  <div className="form-group mb-2">
    <label htmlFor="exampleInputPassword3">Confirm Password</label>
    <input type="password" className="form-control mt-1" id="exampleInputPassword3" placeholder=""
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)} />
  </div>
  <div className='text-center'>
  <button type='button' className="btn btn_blue w-50 mt-4" onClick={handleChangePassword}>Change Password</button>
  </div>
  <div className='tracker-box'>
  <div className={lowerValidated?'validated':'not-validated'}>
            {lowerValidated?(
              <span className='list-icon green'>
                <FontAwesomeIcon icon={faCheckCircle}/>  
              </span>
            ):(
              <span className='list-icon'>
                <FontAwesomeIcon icon={faCircle}/>  
              </span>
            )}
            At least one lowercase letter
          </div>
          <div className={upperValidated?'validated':'not-validated'}>
            {upperValidated?(
              <span className='list-icon green'>
                  <FontAwesomeIcon icon={faCheckCircle}/>  
              </span>
            ):(
              <span className='list-icon'>
                    <FontAwesomeIcon icon={faCircle}/>   
              </span>
            )}
            At least one uppercase letter
          </div>
          <div className={numberValidated?'validated':'not-validated'}>
            {numberValidated?(
              <span className='list-icon green'>
                <FontAwesomeIcon icon={faCheckCircle}/>  
              </span>
            ):(
              <span className='list-icon'>
                    <FontAwesomeIcon icon={faCircle}/>  
              </span>
            )}
            At least one number
          </div>
          <div className={specialValidated?'validated':'not-validated'}>
            {specialValidated?(
              <span className='list-icon green'>
                  <FontAwesomeIcon icon={faCheckCircle}/>  
              </span>
            ):(
              <span className='list-icon'>
                    <FontAwesomeIcon icon={faCircle}/>  
              </span>
            )}
            At least one special character
          </div>
          <div className={lengthValidated?'validated':'not-validated'}>
            {lengthValidated?(
              <span className='list-icon green'>
                  <FontAwesomeIcon icon={faCheckCircle}/>  
              </span>
            ):(
              <span className='list-icon'>
                    <FontAwesomeIcon icon={faCircle}/>  
              </span>
            )}
            At least 8 characters
          </div>
  </div>
</form>
          </div>
        </div>
      )}
  </>
  )
}

export default ChangePassword

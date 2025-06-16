// import React, { useEffect, useState } from "react";
// const Header = () => {
//     return (
//         <nav
//             className="navbar navbar-light bg-white px-4 py-2 border-bottom"
//             style={{
//                 position: 'fixed',
//                 top: 0,
//                 left: '300px',    
//                 right: '50px',
//                 height: '60px',
//                 zIndex: 1050,
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//             }}
//         >

//             <span className="navbar-brand h1 mb-0">Ecommerce Seller</span>

//             <div className="d-flex align-items-center gap-3">
//                 <span className="text-muted">Welcome User</span>
//                 <p className="mb-0 text-primary" role="button" style={{ cursor: 'pointer' }}>
//                     <img
//                         width="40"
//                         height="40"
//                         src="/image/profile.png"
//                         alt="Profile"
//                         className="rounded-circle border"
//                     />
//                 </p>
//             </div>
//         </nav>
//     );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import DynamicModal from '../components/dynamicModal'
import { Typography } from "@mui/material";
import useUser from '../hooks/useUser'
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthContex'
import { useNavigate } from "react-router-dom";
import useAuthentication from '../hooks/useAuthentication'

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthentication()
  const { profile,getProfile } = useUser();
  const { authUser, setAuthUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      getProfile();
    }
  }, [authUser]);

  const handleOpenModal = () => {
    if (!authUser) {
      navigate('/login');
    } else {
      setOpenModal(true);
    }
  };
  const handleCart = () => {
    navigate("/cart")
  }
  const handleOrder = () => {
    navigate('/order')
  }

  const handleClose = () => setOpenModal(false);

  const handleLogOut = async () => {
    await logout()
    setAuthUser(null)
    navigate('/login');
  }

  return (
    <>
      <nav
        className="navbar navbar-light bg-white px-4  py-2 border-bottom"
        style={{
          position: 'fixed',
          top: 0,
          width: '1840px',
          zIndex: 1050,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="navbar-brand h1 mb-0">Ecommerce Buyer</span>

        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">Welcome {profile?.first_name || "User"}</span>

          <p className="mb-0 text-primary" role="button" style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
            <img width="40" height="40" src="/image/profile.png" alt="Profile" className="rounded-circle border" />
          </p>

          <p className="mb-0 text-primary" role="button" style={{ cursor: 'pointer' }} onClick={handleCart}>
            <img width="40" height="40" src="/image/cart.png" alt="Profile" className="rounded-circle border" />
          </p>

          <p className="mb-0 text-primary" role="button" style={{ cursor: 'pointer' }} onClick={handleOrder}>
            <img width="40" height="40" src="/image/order.png" alt="Profile" className="rounded-circle border" />
          </p>

          <button className="btn btn-primary" onClick={handleLogOut}>
            Logout
          </button>

        </div>
      </nav>

      <DynamicModal show={openModal} onHide={handleClose} title="User Profile">
        {profile ? (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <img width="80" height="80" src="/image/profile.png" alt="Profile" style={{ borderRadius: '50%', border: '2px solid #ccc', objectFit: 'cover' }} />
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}> <strong>First Name:</strong> {profile.first_name}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}> <strong>Last Name:</strong> {profile.last_name}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}> <strong>Email:</strong> {profile.email}</Typography>
            <Typography variant="body1"> <strong>Role:</strong> {profile.role}</Typography>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Loading profile...
          </Typography>
        )}
      </DynamicModal>
    </>
  );
};

export default Header;

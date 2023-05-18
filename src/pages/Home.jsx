import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Countries from '../components/Countries';
import LoginContext from '../context/LoginContext';
import HomeContext from '../context/HomeContext';

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire({
        title: 'Você não está logado',
        text: 'Faça login para acessar essa página',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) navigate('/login');
      });
    }
  }, [isLoggedIn, navigate]);

  const { toRender } = useContext(HomeContext);

  if (toRender === 'countries') return (<Countries />);
}

export default Home;

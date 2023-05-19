import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Countries from '../components/Countries';
import LoginContext from '../context/LoginContext';
import HomeContext from '../context/HomeContext';
import Leagues from '../components/Leagues';
import Seasons from '../components/Seasons';
import Teams from '../components/Teams';
import TeamDetails from '../components/TeamDetails/TeamDetails';

function Home() {
  const [countryState, setCountryState] = useState('');
  const [seasonState, setSeasonState] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);
  const { setCountrySelected, setSeasonSelected, setToRender } = useContext(HomeContext);

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

  const handleClickSubmit = () => {
    if (!countryState || !seasonState) {
      return Swal.fire({
        title: 'Você não selecionou um país ou uma temporada',
        text: 'Selecione um país e uma temporada para continuar',
        icon: 'error',
      });
    }

    setCountrySelected(countryState);
    setSeasonSelected(seasonState);

    setToRender('leagues');
  };

  const { toRender } = useContext(HomeContext);

  if (toRender === 'countries') {
    return (
      <div>
        <Countries setCountryState={ setCountryState } />
        <Seasons setSeasonState={ setSeasonState } />
        <button onClick={ handleClickSubmit }> Submit </button>
      </div>
    );
  }
  if (toRender === 'leagues') return (<Leagues />);
  if (toRender === 'teams') return (<Teams />);
  if (toRender === 'team-details') return (<TeamDetails />);
}

export default Home;

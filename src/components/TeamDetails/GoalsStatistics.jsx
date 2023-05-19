import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// import goals from '../../mocks/goals';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function GoalsStatistics(props) {
  const [minutes, setMinutes] = useState([]);
  const [data, setData] = useState({});
  const [options, setOptions] = useState({});

  useEffect(() => {
    const { teamStatistics } = props;
    setMinutes(teamStatistics.goals.for.minute);
    // setMinutes(goals);
  }, [props]);

  useEffect(() => {
    const labels = Object.keys(minutes).map((minute) => `${minute} minutos`);
    const newData = {
      labels,
      datasets: [
        {
          label: 'Gols marcados',
          data: Object.values(minutes).map((minute) => minute.total),
          backgroundColor: 'rgba(0,255,127)',
        },
      ],
    };
    const newOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Gols marcados por minuto',
        },
      },
    };
    setData(newData);
    setOptions(newOptions);
  }, [minutes]);
  if (data.labels) {
    return (
      <div>
        <Bar data={ data } options={ options } />
      </div>
    );
  }
}

GoalsStatistics.propTypes = {
  teamStatistics: PropTypes.shape({
    goals: PropTypes.shape({
      for: PropTypes.shape({
        minute: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default GoalsStatistics;

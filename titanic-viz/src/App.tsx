import React, { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Passenger from './interface/Passenger'
import PassengerTable from './components/PassengerTable/PassengerTable';
import GraphComponent from './components/GraphComponent/GraphComponent';
import axios from 'axios';

const App: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [viewOption, setViewOption] = useState<'table' | 'graph'>('table');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: Passenger[] }>('http://localhost:5000/passenger/get_all/');
        console.log('Data:', response.data);
        setPassengers(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewOptionChange = (option: 'table' | 'graph') => {
    setViewOption(option);
  };

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '60px', left: 0 }}>
      <Header />
      <main style={{ padding: '1em' }}>
        <h3>View Options</h3>
        <div>
          <button onClick={() => handleViewOptionChange('table')} disabled={viewOption === 'table'}>
            Table
          </button>
          <button onClick={() => handleViewOptionChange('graph')} disabled={viewOption === 'graph'}>
            Graph
          </button>
        </div>

        {viewOption === 'table' && (
          <>
            <h3>Passengers Table</h3>
            <PassengerTable passengers={passengers} />
          </>
        )}

        {viewOption === 'graph' && (
          <>
            <h3>Passengers Age Distribution</h3>
            <GraphComponent data={passengers.map(passenger => ({ age: passenger.age }))} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;

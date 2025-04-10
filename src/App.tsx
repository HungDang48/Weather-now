import React from 'react';
import './App.css';
import Header from './component/Header/Header';
import WeatherInfo from './component/WeatherInfo/WeatherInfo';
// đường dẫn đúng tới Header của bạn

function App() {
  return (
    <div style={{ paddingTop: '60px' }}>
      <div className="App">
        <Header />
        <WeatherInfo/>
      </div>
    </div>

  );
}

export default App;

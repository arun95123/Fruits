import React, { useState, useEffect } from 'react';

import Fruits from './components/Fruits'
import Loader from './components/Loader'

import { getFruits } from './api/fruits'
import { FruitResponse } from './api/types';

type Status = 'init' | 'loading' | 'success' | 'failure'

function App() {
  const [status, setStatus] = useState<Status>('init')
  const [fruits, setFruits] = useState<FruitResponse | null>(null)

  useEffect(() => {
    setStatus('loading')
    const getData = async () => {
      const response = await getFruits()
      if (response.isSuccess) {
        setFruits(response.data)
        setStatus('success')
      } else {
        setStatus('failure')
      }
    }
    getData()
  }, [])

  const showContent = () => {
    switch (status) {
      case 'success':
        return <Fruits fruits={fruits ?? []} />
      case 'failure':
        //TODO: Add error component
        return <h2>Error</h2>
      case 'loading':
        return <Loader />
      default:
        <></>
    }
  }

  return (
    <div className="App">
      {showContent()}
    </div>
  );
}

export default App;

import React, { useState } from 'react';

import Form from './Form/Form';
import Results from './Results/Results';
import styles from './App.module.scss';

export default function App() {
  const [results, setResults] = useState([]);

  const changeResults = (result) => {
    setResults([...results, result]);
  };

  return (
    <div className={styles.container}>
      <Form changeResults={changeResults} />
      <Results results={results} />
    </div>
  );
};

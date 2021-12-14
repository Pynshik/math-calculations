import React from "react";

import styles from "./Results.module.scss";

export default function Results({ results }) {
  if (results.length === 0) return null;

  return (
    <div className={styles.results}>
      <p className={styles.title} data-testid='title'>Results:</p>
      {results.map((result, index) => (
        <p data-testid="result-value" key={index}>{result}</p>
      ))}
    </div>
  );
};

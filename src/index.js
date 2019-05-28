import React, { useState, createContext, useCallback } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

const CounterContext = createContext();

const CounterProvider = ({ children }) => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const incrementA = useCallback(() => setCountA(countA + 1), [countA]);
  const incrementB = useCallback(() => setCountB(countB + 1), [countB]);

  const value = {
    countA,
    countB,
    incrementA,
    incrementB
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};

const Counter = React.memo(({ count, increment, name }) => {
  console.log('Rendering', name);
  return (
    <button onClick={increment}>
      Increment {name} ({count})
    </button>
  );
});

function Application() {
  return (
    <CounterContext.Consumer>
      {({ countA, countB, incrementA, incrementB }) => (
        <section>
          <Counter count={countA} name="A" increment={incrementA} />
          <Counter count={countB} name="B" increment={incrementB} />
        </section>
      )}
    </CounterContext.Consumer>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <CounterProvider>
    <Application />
  </CounterProvider>,
  rootElement
);

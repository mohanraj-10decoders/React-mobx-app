import './App.css';
import { useContext, useState, createContext } from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    counter: 0,
    change: (value) => {
      store.counter = value == 0 ? 0 : store.counter + value;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const Counter = () => {
  const store = useContext(StoreContext);
  return useObserver(() => {
    return (
      <div className='counter'>
        <h3>{store.counter}</h3>
      </div>
    );
  });
};

const Buttons = () => {
  const store = useContext(StoreContext);
  return (
    <div className='buttons'>
      <button onClick={() => store.change(-1)}>Decrease</button>
      <button onClick={() => store.change(0)}>RESET</button>
      <button onClick={() => store.change(1)}>Increase</button>
    </div>
  );
};

function App() {
  return (
    <StoreProvider>
      <div className='App'>
        <h1>MobX</h1>
        <Counter />
        <Buttons />
      </div>
    </StoreProvider>
  );
}

export default App;

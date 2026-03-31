import { useEffect } from 'react';
import { fetchCharacters } from './store/slices/characters';
import { useAppDispatch } from './hooks';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;

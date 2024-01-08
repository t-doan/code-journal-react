import { useState } from 'react';
import './App.css';
import { ViewEntries } from './ViewEntries';
import { CreateEntry } from './CreateEntry';

function App() {
  const [view, setView] = useState('createEntry');

  return (
    <>
    {view === 'viewEntries' && <ViewEntries setView={setView}/>}
    {view === 'createEntry' && <CreateEntry view={view} setView={setView}/>}
    </>
  );
}

export default App;

import { useState } from 'react';
import { ViewEntries } from './ViewEntries';
import { EntriesForm } from './EntriesForm';
import './App.css';
import './css/layout.css';
import './css/reset.css';
import './css/styles.css';

function App() {
  const [view, setView] = useState('createEntry');

  return (
    <>
      <Header setView={setView} />
      {view === 'viewEntries' && <ViewEntries setView={setView} />}
      {view === 'createEntry' && <EntriesForm view={view} setView={setView} />}
    </>
  );
}

type HeaderProps = {
  setView: (x: string) => void;
};

function Header({ setView }: HeaderProps) {
  return (
    <header className="header purple-background">
      <div className="container">
        <div className="row">
          <div className="column-full d-flex align-center">
            <h1 className="white-text">Code Journal</h1>
            <h3>
              <a
                id="entriesLink"
                className="entries-link white-text"
                href="#"
                onClick={() => setView('viewEntries')}>
                Entries
              </a>
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
}
export default App;

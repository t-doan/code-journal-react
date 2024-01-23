import * as DataModel from './data';
import { FaPencil } from 'react-icons/fa6';
type ViewProps = {
  setView: (x: string) => void;
  setCurrentEntryId: (n: number) => void;
};

export function ViewEntries({ setView, setCurrentEntryId }: ViewProps) {
  return (
    <>
      <div className="container" data-view="entries">
        <div className="row">
          <div className="column-full d-flex justify-between align-center">
            <h1>Entries</h1>
            <h3>
              <NewButton setView={setView} />
            </h3>
          </div>
        </div>
        <EntryList setView={setView} setCurrentEntryId={setCurrentEntryId} />
      </div>
    </>
  );
}

type EntryListProps = {
  setView: (x: string) => void;
  setCurrentEntryId: (n: number) => void;
};
function EntryList({ setView, setCurrentEntryId }: EntryListProps) {
  const entries = DataModel.readEntries();
  const temp = [];

  for (let i = 0; i < entries.length; i++) {
    temp.push(
      <li key={entries[i].entryId} data-entry-id={entries[i].entryId}>
        <div className="row">
          <div className="column-half">
            <img
              className="input-b-radius form-image"
              src={entries[i].photoUrl}
              alt="image of entry image"
            />
          </div>
          <div className="column-half">
            <div className="row">
              <div className="column-full d-flex justify-between">
                <h3>{entries[i].title}</h3>
                <EditButton
                  setView={setView}
                  entryId={entries[i].entryId}
                  setCurrentEntryId={setCurrentEntryId}
                />
              </div>
            </div>
            <p>{entries[i].notes}</p>
          </div>
        </div>
      </li>
    );
  }
  return (
    <div className="row">
      <div className="column-full">
        <ul className="entry-ul" id="entryUl">
          {temp}
        </ul>
      </div>
    </div>
  );
}
type EditProps = {
  setView: (x: string) => void;
  entryId: number;
  setCurrentEntryId: (n: number) => void;
};
function EditButton({ setView, entryId, setCurrentEntryId }: EditProps) {
  function handleEdit() {
    setView('editEntry');
    setCurrentEntryId(entryId);
  }

  return <FaPencil onClick={handleEdit} />;
}

type NewProps = {
  setView: (x: string) => void;
};

function NewButton({ setView }: NewProps) {
  return (
    <a
      id="formLink"
      className="white-text form-link"
      href="#"
      onClick={() => setView('createEntry')}>
      NEW
    </a>
  );
}

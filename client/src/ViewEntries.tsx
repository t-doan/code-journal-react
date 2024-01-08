import * as DataModel from './data';
import { FaPencil } from 'react-icons/fa6';
type ViewProps = {
  setView: (x: string) => void;
};

export function ViewEntries({ setView }: ViewProps) {
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
        <EntryList setView={setView} />
      </div>
    </>
  );
}

type EntryListProps = {
  setView: (x: string) => void;
};
function EntryList({ setView }: EntryListProps) {
  const entries = DataModel.readEntries();
  const temp = [];

  for (let i = 0; i < entries.length; i++) {
    temp.push(
      <li data-entry-id={entries[i].entryId}>
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
                <EditButton setView={setView} />
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
};
function EditButton({ setView }: EditProps) {
  return <FaPencil onClick={() => setView('editEntry')} />;
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

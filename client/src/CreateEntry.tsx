type Props={
  view:string;
  setView: (y:string) => void;
};

export function CreateEntry ({view, setView} : Props){
  return (
    <div className="container" data-view="entry-form">
      <div className="row">
        <div className="column-full d-flex justify-between">
          <h1 id="formH1">
            {view === 'createEntry' ? 'New Entry' : 'Edit Entry'}
          </h1>
        </div>
      </div>

      <EntryForm/>

    </div>
  );
}

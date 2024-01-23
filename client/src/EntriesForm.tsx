import placeholder from './assets/placeholder-image-square.jpg';
import React, { FormEvent, useState } from 'react';
import * as DataModel from './data';

type Props = {
  view: string;
  setView: (x: string) => void;
  currentEntryId?: number;
};

export function EntriesForm({ view, setView, currentEntryId }: Props) {
  const entries = DataModel.readEntries();
  let entry;
  for (let i = 0; i < entries.length && view === 'editEntry'; i++) {
    if (currentEntryId === entries[i].entryId) {
      entry = entries[i];
    }
  }

  return (
    <div className="container" data-view="entry-form">
      <div className="row">
        <div className="column-full d-flex justify-between">
          <h1 id="formH1">
            {view === 'createEntry' ? 'New Entry' : 'Edit Entry'}
          </h1>
        </div>
      </div>
      <Form view={view} setView={setView} entry={entry} />
    </div>
  );
}

type FormProps = {
  view: string;
  setView: (x: string) => void;
  entry?: DataModel.Entry;
};
function Form({ view, setView, entry }: FormProps) {
  const [title, setTitle] = useState(entry?.title ?? '');
  const [notes, setNotes] = useState(entry?.notes ?? '');
  const [photoUrl, setPhotoUrl] = useState(entry?.photoUrl ?? placeholder);
  const [toggleModal, setToggleModal] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (view === 'createEntry') {
      DataModel.addEntry({ title, notes, photoUrl });
    } else if (view === 'editEntry' && entry && !toggleModal) {
      DataModel.updateEntry({ title, notes, photoUrl, entryId: entry.entryId });
    } else if (view === 'editEntry' && entry && toggleModal) {
      DataModel.removeEntry(entry.entryId);
    }
    setView('viewEntries');
  }
  return (
    <form onSubmit={handleSubmit} id="entryForm">
      <div className="row margin-bottom-1">
        <div className="column-half">
          <Image photoUrl={photoUrl} />
        </div>
        <div className="column-half">
          <Title title={title} setTitle={setTitle} />
          <Photo photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />
          <Notes notes={notes} setNotes={setNotes} />
        </div>
      </div>
      <div className="row">
        <div className="column-full d-flex justify-between">
          {view === 'editEntry' && (
            <DeleteButton setToggleModal={setToggleModal} />
          )}
          <SaveButton />
        </div>
      </div>
      {toggleModal && <Modal setToggleModal={setToggleModal} />}
    </form>
  );
}

type ImageProps = {
  photoUrl: string;
};
function Image({ photoUrl }: ImageProps) {
  return (
    <img
      className="input-b-radius form-image"
      id="formImage"
      src={photoUrl}
      alt="image of entry image"
    />
  );
}

type TitleProps = {
  title: string;
  setTitle: (x: string) => void;
};

function Title({ title, setTitle }: TitleProps) {
  return (
    <label className="margin-bottom-1 d-block">
      Title
      <input
        required
        className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
        type="text"
        id="formTitle"
        name="formTitle"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
    </label>
  );
}

type PhotoProps = {
  photoUrl: string;
  setPhotoUrl: (x: string) => void;
};

function Photo({ photoUrl, setPhotoUrl }: PhotoProps) {
  return (
    <label className="margin-bottom-1 d-block">
      Photo URL
      <input
        required
        className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
        type="text"
        id="formURL"
        name="formURL"
        value={photoUrl === placeholder ? '' : photoUrl}
        onChange={(e) => setPhotoUrl(e.currentTarget.value)}
      />
    </label>
  );
}

type NotesProps = {
  notes: string;
  setNotes: (x: string) => void;
};

function Notes({ notes, setNotes }: NotesProps) {
  return (
    <div className="row margin-bottom-1">
      <div className="column-full">
        <label className="margin-bottom-1 d-block">
          Notes
          <textarea
            required
            className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
            name="formNotes"
            id="formNotes"
            cols={30}
            rows={10}
            value={notes}
            onChange={(e) => setNotes(e.currentTarget.value)}></textarea>
        </label>
      </div>
    </div>
  );
}

type DeleteProps = {
  setToggleModal: (x: boolean) => void;
};
function DeleteButton({ setToggleModal }: DeleteProps) {
  return (
    <button
      className="delete-entry-button"
      type="button"
      id="deleteEntry"
      onClick={() => setToggleModal(true)}>
      Delete Entry
    </button>
  );
}

type ModalProps = {
  setToggleModal: (x: boolean) => void;
};

function Modal({ setToggleModal }: ModalProps) {
  return (
    <article>
      <div
        id="modalContainer"
        className="modal-container d-flex justify-center align-center">
        <div className="modal row">
          <div className="column-full d-flex justify-center">
            <p>Are you sure you want to delete this entry?</p>
          </div>
          <div className="column-full d-flex justify-between">
            <button
              type="button"
              className="modal-button"
              id="cancelButton"
              onClick={() => setToggleModal(false)}>
              Cancel
            </button>
            <button
              className="modal-button red-background white-text"
              id="confirmButton">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function SaveButton() {
  return (
    <button
      type="submit"
      className="input-b-radius text-padding purple-background white-text">
      SAVE
    </button>
  );
}

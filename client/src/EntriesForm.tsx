import placeholder from './assets/placeholder-image-square.jpg';
import React, { FormEvent, useState } from 'react';
import * as DataModel from './data';

type Props = {
  view: string;
  setView: (x: string) => void;
};

export function EntriesForm({ view, setView }: Props) {
  return (
    <div className="container" data-view="entry-form">
      <div className="row">
        <div className="column-full d-flex justify-between">
          <h1 id="formH1">
            {view === 'createEntry' ? 'New Entry' : 'Edit Entry'}
          </h1>
        </div>
      </div>
      <Form view={view} setView={setView} />
    </div>
  );
}

type FormProps = {
  view: string;
  setView: (x: string) => void;
};
function Form({ view, setView }: FormProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [photoURL, setPhotoURL] = useState(placeholder);

  function resetForm() {
    setTitle('');
    setNotes('');
    setPhotoURL(placeholder);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (view === 'createEntry') {
      DataModel.addEntry({ title, notes, photoUrl: photoURL });
    }
    resetForm();
    setView('viewEntries');
  }
  return (
    <form onSubmit={handleSubmit} id="entryForm">
      <div className="row margin-bottom-1">
        <div className="column-half">
          <Image photoURL={photoURL} />
        </div>
        <div className="column-half">
          <Title title={title} setTitle={setTitle} />
          <Photo photoURL={photoURL} setPhotoURL={setPhotoURL} />
          <Notes notes={notes} setNotes={setNotes} />
        </div>
      </div>
      <div className="row">
        <div className="column-full d-flex justify-between">
          <DeleteButton />
          <SaveButton />
        </div>
      </div>
    </form>
  );
}

type ImageProps = {
  photoURL: string;
};
function Image({ photoURL }: ImageProps) {
  return (
    <img
      className="input-b-radius form-image"
      id="formImage"
      src={photoURL}
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
  photoURL: string;
  setPhotoURL: (x: string) => void;
};

function Photo({ photoURL, setPhotoURL }: PhotoProps) {
  return (
    <label className="margin-bottom-1 d-block">
      Photo URL
      <input
        required
        className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
        type="text"
        id="formURL"
        name="formURL"
        value={photoURL === placeholder ? '' : photoURL}
        onChange={(e) => setPhotoURL(e.currentTarget.value)}
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

function DeleteButton() {
  return (
    <button
      className="invisible delete-entry-button"
      type="button"
      id="deleteEntry">
      Delete Entry
    </button>
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

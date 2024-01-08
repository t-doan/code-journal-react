import { readEntries } from "./data"


type Props={
  setView: (x:string) => void;
};

export function ViewEntries ({setView} : Props){
  return (
    <EntryList/>
  );
}

function EntryList(){
  return (<>{readEntries()}</>);
}

// function EditButton(){

// }



// function NewButton(){

// }

import React from 'react';
import AltContainer from 'alt-container';

import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions.jsx';
import NoteStore from '../stores/NoteStore.js';

export default class App extends React.Component {
  render() {

    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>

        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }}
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    )
  }

  addNote = () => {
    NoteActions.create({task: 'New Task'})
  };

  deleteNote = (id, e) => {
    e.stopPropagation();

    NoteActions.delete(id);
  };

  editNote = (id, task) => {
    // Don't modify if trying to set an empty value
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  };
}

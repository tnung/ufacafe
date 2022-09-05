'use babel';

import UfacafeView from './ufacafe-view';
import { CompositeDisposable } from 'atom';

export default {

  ufacafeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ufacafeView = new UfacafeView(state.ufacafeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ufacafeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ufacafe:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ufacafeView.destroy();
  },

  serialize() {
    return {
      ufacafeViewState: this.ufacafeView.serialize()
    };
  },

  toggle() {
    console.log('Ufacafe was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

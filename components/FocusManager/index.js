/**
 * FocusManager Component
 *
 * Container to set focus on elements with key[Up/Down] or key[Left/Right]
 */
import lng from 'wpe-lightning';

export default class FocusManager extends lng.Component {
  _init() {
    this._direction = this.direction || 'row';
    this.selectedIndex = this.selectedIndex || 0;
  }

  set direction(direction) {
    this._direction = direction;
    if (this._direction === 'column') {
      this._setState('Column');
    } else {
      this._setState('Row');
    }
  }

  get loading() {
    return !this.selected;
  }

  get items() {
    return this.children;
  }

  set items(items) {
    this.childList.clear();
    this.appendItems(items);
  }

  // Can be overriden
  appendItems(items = []) {
    this.childList.a(items);
    this._refocus();
  }

  get selected() {
    return this.children[this.selectedIndex];
  }

  set selectedIndex(index) {
    let previousIndex = this.selectedIndex;

    if (this.children[index] && this.children[index].skipFocus) {
      this.selectedIndex = index > previousIndex ? index + 1 : index - 1;
      return;
    }
    if (index > 0) {
      if (index < this.children.length) {
        this._selectedIndex = index;
      } else {
        this._selectedIndex = this.children.length - 1;
      }
    } else {
      this._selectedIndex = 0;
    }

    this._refocus();
    if (this.selected) {
      let direction = previousIndex < this._selectedIndex ? 'next' : 'previous';
      let args = [this.selected, this.children[previousIndex], direction];
      this.render(...args);
      this.signal('selectedChange', ...args);
    }
  }

  // Override
  render() {}

  get selectedIndex() {
    return this._selectedIndex || 0;
  }

  selectPrevious() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      return true;
    } else if (this.wrapSelected) {
      this.selectedIndex = this.children.length - 1;
      return true;
    }
    return false;
  }

  selectNext() {
    if (this.selectedIndex < this.children.length - 1) {
      this.selectedIndex++;
      return true;
    } else if (this.wrapSelected) {
      this.selectedIndex = 0;
      return true;
    }
    return false;
  }

  _getFocused() {
    let { selected } = this;
    return selected && selected.focusRef
      ? selected.tag(selected.focusRef)
      : selected;
  }

  get _size() {
    return this.children.length;
  }

  static _states() {
    return [
      class Row extends this {
        _handleLeft() {
          return this.selectPrevious();
        }

        _handleRight() {
          return this.selectNext();
        }
      },

      class Column extends this {
        _handleUp() {
          return this.selectPrevious();
        }

        _handleDown() {
          return this.selectNext();
        }
      }
    ];
  }
}

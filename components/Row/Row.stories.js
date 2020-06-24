import lng from 'wpe-lightning';
import { number, withKnobs, boolean } from '@storybook/addon-knobs';

import Row from '.';
import mdx from './Row.mdx';

export default {
  title: 'Row',
  component: Row,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Basic = () =>
  class Basic extends lng.Component {
    static _template() {
      return {
        x: 20,
        y: 20,
        Row: {
          type: Row,
          w: 900,
          items: [
            { type: Button, buttonText: 'Button', w: 150 },
            { type: Button, buttonText: 'Button', w: 150 },
            { type: Button, buttonText: 'Button', w: 150 }
          ]
        }
      };
    }

    _init() {
      super._init();
      this.itemSpacing = 100;
    }

    _getFocused() {
      return this.tag('Row');
    }
  };

const numberOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.1
};

export const SideScrolling = () =>
  class SideScrolling extends lng.Component {
    static _template() {
      return {
        x: 20,
        y: 20,
        Row: {
          type: Row,
          w: 900,
          alwaysScroll: boolean('alwaysScroll', false),
          scrollMount: number('scrollMount', 1, numberOptions),
          items: [
            { type: Button, buttonText: 'Button', w: 150 },
            { type: Button, buttonText: 'Button', w: 150 },
            { type: Button, buttonText: 'Button', w: 150 },
            { type: Button, buttonText: 'Button', w: 150 },
            { type: Button, buttonText: 'Button', w: 150 },
            { type: Button, buttonText: 'Button', w: 150 },
            { type: Button, buttonText: 'Button', w: 150 }
          ]
        }
      };
    }

    _getFocused() {
      return this.tag('Row');
    }
  };

export const VaryingItemWidth = () =>
  class VaryingItemWidth extends lng.Component {
    static _template() {
      return {
        x: 20,
        y: 20,
        Row: {
          type: Row,
          items: Array.apply(null, { length: 10 }).map((_, i) => ({
            type: Button,
            buttonText: 'Button',
            w: 120 + Math.floor(Math.random() * 80)
          }))
        }
      };
    }

    _getFocused() {
      return this.tag('Row');
    }
  };

class ExtendedRow extends lng.Component {
  static _template() {
    return {
      Title: {
        text: {
          x: 0,
          y: 0
        }
      },
      Row: {
        type: Row,
        y: 50
      }
    };
  }

  _setup() {
    const { Row, Title } = this;
    Row.items = this.items;

    if (typeof this.title === 'function') {
      Title.text = this.title(Row.selected);
      Row.onScreenEffect = () => (Title.text = this.title(Row.selected));
    } else {
      Title.text = this.title;
    }
  }

  _getFocused() {
    return this.tag('Row');
  }

  get Row() {
    return this.tag('Row');
  }

  get Title() {
    return this.tag('Title');
  }
}

export const ExtendingRow = () =>
  class ExtendingRow extends lng.Component {
    static _template() {
      return {
        x: 20,
        y: 20,
        Row: {
          type: ExtendedRow,
          title: selected => selected.buttonText,
          items: [
            { type: Button, buttonText: 'Button 1', w: 150 },
            { type: Button, buttonText: 'Button 2', w: 150 },
            { type: Button, buttonText: 'Button 3', w: 150 }
          ]
        }
      };
    }

    _getFocused() {
      return this.tag('Row');
    }
  };

class Button extends lng.Component {
  static _template() {
    return {
      color: 0xff1f1f1f,
      texture: lng.Tools.getRoundRect(150, 40, 4),
      Label: {
        x: 75,
        y: 22,
        mount: 0.5,
        color: 0xffffffff,
        text: { fontSize: 20 }
      }
    };
  }
  _init() {
    this.tag('Label').text = this.buttonText;
  }
  _focus() {
    this.color = 0xffffffff;
    this.tag('Label').color = 0xff1f1f1f;
  }
  _unfocus() {
    this.color = 0xff1f1f1f;
    this.tag('Label').color = 0xffffffff;
  }
}

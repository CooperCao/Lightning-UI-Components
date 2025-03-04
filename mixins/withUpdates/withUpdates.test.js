import lng from '@lightningjs/core';
import TestUtils from '../../components/lightning-test-utils';
import withUpdates from '.';

const updateMock = jest.fn();

describe('withUpdates', () => {
  let WithUpdatesComponent, testRenderer;
  class Example extends lng.Component {
    static get properties() {
      return ['title', 'score'];
    }

    _update() {
      updateMock();
    }
  }

  beforeEach(() => {
    [WithUpdatesComponent, testRenderer] = TestUtils.makeCreateComponent(
      withUpdates(Example)
    )();
  });

  afterEach(() => {
    WithUpdatesComponent = null;
  });

  it('extends the base class', () => {
    expect(WithUpdatesComponent.constructor.name).toBe('Example');
  });

  it('calls _update when enabled', () => {
    expect(updateMock).toHaveBeenCalled();
  });

  it('calls _update when a property changes', done => {
    updateMock.mockClear();
    WithUpdatesComponent.title = 'Test';
    setTimeout(() => {
      expect(updateMock).toHaveBeenCalled();
      done();
    });
  });

  it('debounces the _update call', done => {
    updateMock.mockClear();
    WithUpdatesComponent.title = 'Test';
    WithUpdatesComponent.score = 5;
    setTimeout(() => {
      expect(updateMock).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('allows custom getter', () => {
    WithUpdatesComponent._getTitle = () => {
      return 'Custom Getter';
    };
    WithUpdatesComponent.title = 'Test';
    expect(WithUpdatesComponent.title).toEqual('Custom Getter');
  });

  it('allows custom setter', () => {
    WithUpdatesComponent._setTitle = value => {
      return `${value} Custom Getter`;
    };
    WithUpdatesComponent.title = 'Test';
    expect(WithUpdatesComponent.title).toEqual('Test Custom Getter');
  });
});

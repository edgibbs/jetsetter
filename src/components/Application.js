import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import './Application.css';

const defaultState = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true },
];

class Application extends Component {
  state = {
    items: defaultState,
  };

  packedItems = () => {
    return this.state.items.filter(item => item.packed === true);
  };

  unpackedItems = () => {
    return this.state.items.filter(item => item.packed === false);
  };

  addItem = item => {
    this.setState({ items: [item, ...this.state.items] });
  };

  removeItem = itemToRemove => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemToRemove.id),
    });
  };

  toggleItem = itemToToggle => {
    const items = this.state.items.map(item => {
      if (item.id !== itemToToggle.id) return item;
      return { ...itemToToggle, packed: !itemToToggle.packed };
    });
    this.setState({ items });
  };

  resetList = items => {
    const updatedItems = items.map(item => {
      const newObject = Object.assign({}, item);
      newObject.packed = false;
      return newObject;
    });

    this.setState(oldState => {
      return { items: updatedItems };
    });
  };

  render() {
    return (
      <div className="Application">
        <NewItem onSubmit={this.addItem} />
        <CountDown />
        <Items
          title="Unpacked Items"
          items={this.unpackedItems()}
          onRemove={this.removeItem}
          onToggle={this.toggleItem}
        />
        <Items
          title="Packed Items"
          items={this.packedItems()}
          onRemove={this.removeItem}
          onToggle={this.toggleItem}
        />
        <button className="button full-width">Mark All As Unpacked</button>
      </div>
    );
  }
}

export default Application;

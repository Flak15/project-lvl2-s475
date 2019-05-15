import _ from 'lodash';

class DiffNode {
  constructor(key) {
    this.key = key;
    this.children = [];
  }
  getKey() {
    return this.key;
  }
  getMinusValue() {
    return this.minusValue;
  }
  getPlusValue() {
    return this.plusValue;
  }
  setMinusValue(value) {
    this.minusValue = value;
  }
  setPlusValue(value) {
    this.plusValue = value;
  }
  hasMinusValue() {
    return _.has(this, 'minusValue');
  }
  hasPlusValue() {
    return _.has(this, 'plusValue');
  }
  addChild(child) {
    this.children = [...this.children, ...child];
    return child;
  }
  hasChildren() {
    return this.children.length !== 0;
  }
  getChildren() {
    return this.children;
  }
}

export default DiffNode;

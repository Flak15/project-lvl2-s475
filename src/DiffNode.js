import _ from 'lodash';

class DiffNode {
  constructor(key) {
    this.key = key;
    this.children = [];
  }
  getKey() {
    return this.key;
  }
  setKey(newKey) {
    this.key = newKey;
    return this;
  }
  getInitialValue() {
    return this.initialValue;
  }
  getFinalValue() {
    return this.finalValue;
  }
  setInitialValue(value) {
    this.initialValue = value;
  }
  setFinalValue(value) {
    this.finalValue = value;
  }
  hasInitialValue() {
    return _.has(this, 'initialValue');
  }
  hasFinalValue() {
    return _.has(this, 'finalValue');
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

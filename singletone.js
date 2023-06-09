class Singletone {
  #instance;

  createInstance() {
    return new Object('instance');
  }

  setInstance() {
    if (this.#instance === null) {
      this.#instance = this.createInstance();
    }
  }

  getInstance() {
    return this.#instance;
  }
}

var instance1 = new Singletone().getInstance();
var instance2 = new Singletone().getInstance();

console.log('Same instance? ' + (instance1 === instance2));

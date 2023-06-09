interface Publisher {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

interface Observer {
  update(publisher: Publisher): void;
}

class ConcretePublisher implements Publisher {
  public state!: number;
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log('this obsever exists');
    }
    this.observers.push(observer);
    console.log('attached');
  }
  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex == -1) {
      console.log("observer has already been detached or doesn't exist");
    }
    this.observers.splice(observerIndex, 1);
    console.log('detached');
  }
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
      console.log('updated');
    }
  }

  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}

class ConcreteObserver1 implements Observer {
  public update(publisher: Publisher): void {
    if (publisher instanceof ConcretePublisher && publisher.state < 3) {
      console.log('1 reacts to the changes');
    }
  }
}

class ConcreteObserver2 implements Observer {
  public update(publisher: Publisher): void {
    if (
      publisher instanceof ConcretePublisher &&
      (publisher.state == 0 || publisher.state >= 2)
    ) {
      console.log('2 reacts to the changes');
    }
  }
}

const publisher = new ConcretePublisher();
const observer1 = new ConcreteObserver1();
publisher.attach(observer1);
const observer2 = new ConcreteObserver2();
publisher.attach(observer2);
publisher.someBusinessLogic();
publisher.someBusinessLogic();
publisher.detach(observer2);
publisher.someBusinessLogic();

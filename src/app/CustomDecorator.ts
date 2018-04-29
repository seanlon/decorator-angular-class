
import {  BaseComponent } from './base.component';

// extend base class
// override constructor to call super
// inject in angular 
export function ClassAbcDescriptor(message) {
    console.log('ClassAbcDescriptor ');
    return function (target) {
        console.log('Our decorated class', target);
    }
} 

// how extend parent
// how invoke super 
// how access injector
// how put new injector?
export function CustomComponent(options) {
  return (target) => {
    const original = target;

    const newConstructor: any = function newCtor(...args) {
      const c: any = function childConstuctor() {
          console.log('arguments',arguments);
          console.log('this',this);

         return BaseComponent.apply(this,arguments);
        // return original.apply(this, arguments);
      };
      c.prototype = Object.create(original.prototype);
      const instance = new c(...args);

      instance.url = options.url;

      return instance;
    };

    newConstructor.prototype = Object.create(target.prototype); 
    
    return newConstructor;
  }
 
}

 
interface Newable<T> {
    new (...args: any[]): T;
}
export function CustomClass(prefix: Newable<Object>) { 
  return (target) => {
    // save a reference to the original constructor
    var original = target;
    var f,c;

    // a utility function to generate instances of a class
    function construct(constructor, args) {
        c = function () {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      return new c();
    }

    // the new constructor behavior
      f = function (...args) {
      console.log(prefix + original.name);
      return construct(original, args);
    }

    // copy prototype so instanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
  };
}


export function log(prefix?: string) {
    return (target) => {
        // save a reference to the original constructor
        const original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            const c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        // the new constructor behavior
        const f: any = function (...args) {
            console.log(prefix + original.name);
            return construct(original, args);
        }

        // copy prototype so instanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
    };
}


class Component {
    age: number;
}

export function NgLog(name: string) {
    return <T extends Component>(constructor: new () => T): new () => T => {
        console.log(constructor.arguments)
        constructor.prototype.doSomething;
        return constructor;
    }
}
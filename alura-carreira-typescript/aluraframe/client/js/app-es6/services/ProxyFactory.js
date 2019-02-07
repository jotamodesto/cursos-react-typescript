class ProxyFactory {
  static create(objeto, props, acao) {
    return new Proxy(objeto, {
      get(target, prop, receiver) {
        if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
          return function() {
            console.log(`interceptando ${prop}`);
            const apply = Reflect.apply(target[prop], target, arguments);
            acao(target);
            return apply;
          };
        }

        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        const setter = Reflect.set(target, prop, value, receiver);
        if (props.includes(prop)) {
          acao(target);
        }
        return setter;
      }
    });
  }

  static _ehFuncao(func) {
    return typeof func === typeof Function;
  }
}

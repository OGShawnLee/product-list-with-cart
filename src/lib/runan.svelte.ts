export function ref<T>(initial: T) {
  let state = $state(initial);
  return {
    get value() {
      return state;
    },
    set value(value: T) {
      state = value;
    }
  }
}

export function computed<T>(getter: () => T) {
  return {
    get value() {
      return getter();
    }
  }
}

export function readonly<T>(reference: { value: T }) {
  return {
    get value() {
      return reference.value;
    }
  }
}
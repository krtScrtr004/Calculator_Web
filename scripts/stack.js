export function stack(...args) {
  const MAX_STACK_SIZE = 10e10;
  const arr = [...args];
  let size = arr.length;

  return {
    push(val) {
      if (size > MAX_STACK_SIZE) {
        throw new Error("Stack overflow");
      }
      arr.push(val);
      size++;
    },

    pop() {
      if (size <= 0) {
        throw new Error("Stack underflow");
      }

      arr.pop();
      size--;
    },

    get top() {
      return arr[size - 1];
    },

    get size() {
      return size;
    },

    get isEmpty() {
      return size <= 0;
    },

    get isFull() {
      return size >= MAX_STACK_SIZE;
    },

    get elems() {
      return [...arr];
    }
  };
}

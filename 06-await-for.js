const stream = {
  count: 0,
  async next() {
    this.count++;
    if (this.count > 5) {
      return { done: true };
    }
    return {
      done: false, // Indicates that the stream is not done yet
      value: `Chunk ${this.count}`,
    };
  },
  [Symbol.asyncIterator]() {
    return this;
  }, // This method makes the object an async iterable
};

for await (const chunk of stream) {
  //const var ; fun stream

  console.log(chunk);
}

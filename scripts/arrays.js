// https://stackoverflow.com/a/15106541
function randomObjectValue(obj) {
    const keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};

export { randomObjectValue }

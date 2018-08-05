function random(a, b){
  return Math.floor(a + (Math.random() * (b-a)));
}

module.exports = {
  random
};

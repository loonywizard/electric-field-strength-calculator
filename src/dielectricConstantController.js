export default function createDielectricConstantController() {
  const input = document.getElementById('dielectric-constant-input');
  const subscribers = [];
  let dielectricConstant = 1;

  input.addEventListener('input', (event) => {
    dielectricConstant = +event.target.value;
    subscribers.forEach(cb => { cb(); });
  });

  const subscribe = (cb) => {
    subscribers.push(cb);
  };

  const getDielectricConstant = () => dielectricConstant;

  return {
    subscribe,
    getDielectricConstant,
  };
}
export default function createNewChargeCreator(createChargeCallback) {
  const buttonNode = document.getElementById('add-charge-button');
  const inputNode = document.getElementById('new-charge-value');

  let value = inputNode.value;

  inputNode.addEventListener('input', () => {
    value = inputNode.value;
  });

  buttonNode.addEventListener('click', () => {
    createChargeCallback(value);
  });
}
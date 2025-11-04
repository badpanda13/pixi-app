let counter = 0;
const counterElement = document.getElementById('counter');

export function incCoins() {
  if (counterElement!=null) {
    counterElement.textContent = (++counter).toString();
  } 
}

export function decCoins() {
   if (counterElement!=null) {
    counterElement.textContent = (--counter).toString();
  } 
}
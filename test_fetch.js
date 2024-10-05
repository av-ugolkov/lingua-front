async function asyncRandomWord() {
  console.log(new Date().toLocaleString());
  const resp = await fetch('http://localhost:5000/test');
  console.log(new Date().toLocaleString(), resp);
}
for (let i = 0; i < 100; i++) {
  asyncRandomWord();
}

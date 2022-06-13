document.getElementsByClassName('slogan')[0].addEventListener('click', function() {
  let h1 = document.getElementsByTagName('h1')[0];
  h1.innerHTML = "Hello";
});

document.getElementsByTagName('button')[0].addEventListener('click', function() {
  document.getElementsByClassName('hidden')[0].style.display = 'block';
});


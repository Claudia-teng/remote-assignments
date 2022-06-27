function ajax(src, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", src, true);
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        callback(xhttp.responseText);
      } else {
      }
    }
  };
  xhttp.send();
}

function render(data) {
  console.log(data);
}

ajax(
  "https://www.appworks-school.github.io/Remote-Assignment-Data/products",
  function (response) {
    render(response);
  }
);

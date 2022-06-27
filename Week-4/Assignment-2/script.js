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
  let response = JSON.parse(data);
  for (let item of response) {
    const div = document.createElement("div");
    for (let property in item) {
      const node = document.createElement("p");
      node.innerHTML = item[property];
      div.appendChild(node);
    }
    document.getElementsByClassName("container")[0].appendChild(div);
  }
}

ajax("https://appworks-school.github.io/Remote-Aassigiment-Data/products", function (response) {
  render(response);
});

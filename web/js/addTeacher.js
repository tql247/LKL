function addTeacher(name, phone, birth, address, idnum, username, password) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: name,
    birth: birth,
    phone: phone,
    CMND: idnum,
    address: address,
    username: username,
    password: password,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:4000/teacher/add", requestOptions)
    .then((response) => response.text())
    .then((result) => window.location.reload())
    .catch((error) => console.log("error", error));
}

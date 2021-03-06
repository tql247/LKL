function signIn(name, phone, birth, address, idnum, username, password, next) {
  activeElement("loading");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: name,
    phone: phone,
    birth: parseInt(birth),
    address: address,
    idnum: idnum,
    username: username,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:4000/user/signin", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      localStorage.setItem("signinStatus", true);
      console.log(localStorage.getItem("signinStatus"))
      if (next === "#") window.location.reload();
      else window.location.href = next;
    })
    .catch((error) => localStorage.setItem("signinStatus", false));
}

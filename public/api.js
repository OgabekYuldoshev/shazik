async function userUpdate(e) {
  e.preventDefault();
  await axios
    .post("/update-user", {
      fullname: e.target.elements["fullname"].value,
      address: e.target.elements["address"].value,
      about: e.target.elements["about"].value,
      status: e.target.elements["status"].value,
      position: e.target.elements["position"].value,
      email: e.target.elements["email"].value,
      phone: e.target.elements["phone"].value,
    })
    .then((res) => {
      $("#alert-text").text(res.data.msg);
      $("#alert")
        .addClass("bg-green-100 border-green-400 text-green-700")
        .fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
      location.reload();
    })
    .catch((err) => {
      $("#alert-text").text(err);
      $("#alert").addClass("bg-red-100 border-red-400 text-red-700").fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
    });
}

async function changePassword(e) {
  e.preventDefault();
  console.log(e.target.elements["password"].value);
  await axios
    .post("/change-password", {
      username: e.target.elements["username"].value,
      password: e.target.elements["password"].value,
      confirm: e.target.elements["confirm"].value,
    })
    .then((res) => {
      $("#alert-text").text(res.data.msg);
      $("#alert")
        .addClass("bg-green-100 border-green-400 text-green-700")
        .fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
    })
    .catch((err) => {
      $("#alert-text").text(err);
      $("#alert").addClass("bg-red-100 border-red-400 text-red-700").fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
    });
}

async function add_skills(e) {
  e.preventDefault();
  // console.log(e.target.elements["password"].value)
  await axios
    .post("/add_skills", {
      name: e.target.elements["name"].value,
      percent: e.target.elements["percent"].value,
    })
    .then((res) => {
      $("#alert-text").text(res.data.msg);
      $("#alert")
        .addClass("bg-green-100 border-green-400 text-green-700")
        .fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
      location.reload();
    })
    .catch((err) => {
      $("#alert-text").text(err);
      $("#alert").addClass("bg-red-100 border-red-400 text-red-700").fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
    });
}

async function delete_skill(id) {
  await axios
    .delete("/delete_skill", {
      data:{id}
    })
    .then((res) => {
      $("#alert-text").text(res.data.msg);
      $("#alert")
        .addClass("bg-green-100 border-green-400 text-green-700")
        .fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
      location.reload();
    })
    .catch((err) => {
      $("#alert-text").text(err);
      $("#alert").addClass("bg-red-100 border-red-400 text-red-700").fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
    });
}

async function register(e) {
  e.preventDefault();
  await axios
    .post("/reg", {
      fullname: e.target.elements["fullname"].value,
      username: e.target.elements["username"].value,
      password: e.target.elements["password"].value,
      regkey: e.target.elements["regkey"].value,
    })
    .then((res) => {
      $("#alert-text").text(res.data.msg);
      $("#alert")
        .addClass("bg-green-100 border-green-400 text-green-700")
        .fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
      $(location).prop("href", "/login");
    })
    .catch((err) => {
      $("#alert-text").text(err);
      $("#alert").addClass("bg-red-100 border-red-400 text-red-700").fadeIn();
      setTimeout(() => {
        $("#alert").fadeOut();
      }, 2000);
    });
}

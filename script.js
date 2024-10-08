const genBtn = document.getElementById("generate");
const user = document.getElementById("user");

function fetchUser() {
  fetch("https://randomuser.me/api/")
    .then((result) => result.json())
    .then((data) => {
      const dataSource = data.results[0];
      const dataObj = {
        Name: dataSource.name.first + " " + dataSource.name.last,
        Email: dataSource.email,
        Phone: dataSource.phone,
        Location: dataSource.location.city + ", " + dataSource.location.country,
        Age: dataSource.dob.age,
      };

      displayUser(dataObj, dataSource.picture.large, dataSource.gender);
    });
}

function displayUser(dataObj, imgURL, gender) {
  user.innerHTML = "";

  document.body.classList.remove("bg-white");
  document.body.classList.remove("bg-slate-950");
  document.body.classList.remove("bg-red-600");

  if (gender === "male") {
    document.body.classList.add("bg-slate-950");
  } else {
    document.body.classList.add("bg-red-600");
  }

  const divFJB = document.createElement("div");
  const div = document.createElement("div");
  const userImg = document.createElement("img");
  userImg.src = imgURL;
  userImg.classList = "w-48 h-48 rounded-full mr-8";
  const divInner = document.createElement("div");

  Object.keys(dataObj).forEach((data) => {
    const textArea = document.createElement("p");
    const areaDesig = document.createElement("span");

    areaDesig.innerText = data + ": ";
    areaDesig.classList = "font-bold";
    const dataItem = document.createTextNode(dataObj[data]);

    textArea.appendChild(areaDesig);
    textArea.appendChild(dataItem);
    textArea.classList = "text-xl";

    divInner.appendChild(textArea);
  });

  divInner.classList = "space-y-3";

  div.appendChild(userImg);
  div.appendChild(divInner);
  div.classList = "flex";

  divFJB.appendChild(div);
  divFJB.classList = "flex justify-between";

  user.appendChild(divFJB);
}

genBtn.addEventListener("click", fetchUser);

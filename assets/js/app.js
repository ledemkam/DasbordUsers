const searchInput = document.querySelector("#search");
const resultSearch = document.querySelector(".table-results");

let dataArray;

async function getUsers() {
  const res = await fetch("https://randomuser.me/api/?nat=de&results=50");

  const { results } = await res.json();
  dataArray = orderList(results);
  createUserList(dataArray);
  console.log(dataArray);
}

getUsers();

const orderList = (data) => {
  const orderedData = data.sort((a, b) => {
    if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
      return -1;
    }
    if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return orderedData;
};

const createUserList = (userList) => {
  userList.forEach((user) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "table-item");

    listItem.innerHTML = `<div class="container-img">
        <img src=${user.picture.medium} alt=${user.name.last}">
        <p class="name">${user.name.last} ${user.name.first}</p>
        </div>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone}</p>
        `;
    resultSearch.appendChild(listItem);
  });
};

searchInput.addEventListener("input", filterData);

function filterData(e) {
  resultSearch.innerHTML = "";
  searchedString = e.target.value.toLowerCase().replace(/\s/g, "");
  const filteredArr = dataArray.filter(
    (el) =>
      el.name.first.toLowerCase().includes(searchedString) ||
      el.name.last.toLowerCase().includes(searchedString) ||
      `${el.name.last + el.name.first}`
        .replace(/\s/g, "")
        .includes(searchedString)
  );

  createUserList(filteredArr);
}

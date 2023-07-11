let title = document.getElementById("title");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let price = document.getElementById("price");
let category = document.getElementById("category");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let inCount = document.getElementById("in-count");
let outCount = document.getElementById("out-count");
let submit = document.getElementById("submit");

let mood = "create";

let tmp;



// =====>> get total <<====
function getTotal() {
  if (price.value !== "") {
    var result = +price.value + +ads.value + +taxes.value - +discount.value;

    total.innerHTML = result;

    total.style.backgroundColor = "#060";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#dd2c00";
  }
}

// ===>> create product <<====
if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}





//=====>> Btn Click <<========
submit.onclick = function () {
  let productItem = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    inCount: inCount.value,
    outCount: outCount.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    productItem.count < 101
  ) {
    if (mood === "create") {
      if (productItem.count > 1) {
        productData.push(productItem);
      } else {
        productData.push(productItem);
      }
    }
    else {
      if (productItem.outCount != "") {

        productItem.count = (+productItem.count) - (+productItem.outCount)
      }
      if (productItem.inCount != "") {
        productItem.count = (+productItem.count) + (+productItem.inCount)
      }
      productData[tmp] = productItem;

      mood = "create";

      submit.innerHTML = "create";

      // count.style.display = "block";
    }

    clearInp();
  }
  // else {
  //   count.style.cssText = `

  //   `
  // }

  localStorage.setItem("product", JSON.stringify(productData));

  showData();
};







// ====>> Clear Data From Input <<=====
function clearInp() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  inCount.value = "";
  outCount.value = "";
  category.value = "";
  total.innerHTML = "";
}






// ====>> Show Data <<===
function showData() {
  getTotal();

  let table = "";

  for (let i = 0; i < productData.length; i++) {

    table += `
            <tr>
              <td> ${i + 1} </td>
              <td> ${productData[i].title} </td>
              <td> ${productData[i].category} </td>
              <td> ${productData[i].price} </td>
              <td> ${productData[i].ads} </td>
              <td> ${productData[i].discount} </td>
              <td> ${productData[i].total} </td>
              <td> ${productData[i].count} </td>
              <td> <button onclick = "updateData(${i})" id="btnUpdate">  Update </button> </td>
              <td> <button onclick= "deleteData(${productData[i].count}, ${i})" id="btnDelete"> Delete </button> </td>
            </tr>
         `;
  }

  document.getElementById("tbody").innerHTML = table;

  let deleteDiv = document.querySelector(".deletePro");

  if (productData.length > 0) {
    deleteDiv.innerHTML = `<button onclick = "deleteAll()" class="delete" > Delete All ( ${productData.length} ) </button>`;
  } else {
    deleteDiv.innerHTML = "";
  }
}
showData();

//====>> Show DeleteAll <<=====






// ====>> Delete Product  <<======
function deleteData(count, index) {
  console.log(count);
  if (count > 0) {
    count--;
    productData[index].count = count
  }
  else {
    productData.splice(index, 1);
  }

  localStorage.product = JSON.stringify(productData);

  showData();
}







//=====>> Delete All Product <<=====

function deleteAll() {
  localStorage.clear();

  productData.splice(0);

  showData();
}




//====>> Update Data <<=======

function updateData(i) {
  title.value = productData[i].title;
  price.value = productData[i].price;
  taxes.value = productData[i].taxes;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  count.value = productData[i].count;
  inCount.value = "";
  outCount.value = "";
  category.value = productData[i].category;
  getTotal();
  // count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;

  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
}



//===========>> Search Mood  <<===============

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "search by title") {
    searchMood = "title";
    search.placeholder = "search by title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showData();
}

//=====>> search <<========

function searchData(value) {
  let table = "";

  if (searchMood == "title") {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.includes(value) || productData[i].total.includes(value)) {
        table += `
                     <tr>
                        <td> ${i} </td>
                        <td> ${productData[i].title} </td>
                        <td> ${productData[i].category} </td>
                        <td> ${productData[i].price} </td>
                        <td> ${productData[i].ads} </td>
                        <td> ${productData[i].discount} </td>
                        <td> ${productData[i].total} </td>
                        <td> ${productData[i].count} </td>
                        <td> <button onclick = "updateData(${i})" id="btnUpdate">  Update </button> </td>
                        <td> <button onclick= "deleteData(${i})" id="btnDelete"> Delete </button> </td>
                     </tr>
                  `;
      }
    }
  } else {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].category.includes(value.toLowerCase())) {
        table += `
                     <tr>
                        <td> ${i} </td>
                        <td> ${productData[i].title} </td>
                        <td> ${productData[i].category} </td>
                        <td> ${productData[i].price} </td>
                        <td> ${productData[i].ads} </td>
                        <td> ${productData[i].discount} </td>
                        <td> ${productData[i].total} </td>
                        <td> <button onclick = "updateData(${i})" id="btnUpdate">  Update </button> </td>
                        <td> <button onclick= "deleteData(${i})" id="btnDelete"> Delete </button> </td>
                     </tr>
                  `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}




//================ dark mode   =================

let darkMoodImage = document.querySelector(".dark-mood-image img");

  darkMoodImage.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      darkMoodImage.src = "img/sun.png";
    } else {
      darkMoodImage.src = "img/moon.png";
    }
  });



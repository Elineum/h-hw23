import categoriesMockAPI from "./categoriesAPI.mjs";
import cityListAPI from "./cityListAPI.mjs";

const localStorage = window.localStorage;
const categoriesBlockElement = document.querySelector(".categories-block");
const productsElement = document.querySelector(".products");
const productInfoElement = document.querySelector(".product-info");
const purchaseForm = document.querySelector(".purchase-form");
const modalWindow = document.querySelector(".modal");
const myPurchaseButton = document.querySelector(".my-basket");
const productInfo = document.querySelector(".card-info");

const getLocalStoragePurchase = () => {
  return localStorage.getItem("purchases")
    ? JSON.parse(localStorage.getItem("purchases"))
    : [];
};

const renderModalWindow = (purchaseData) => {
  const {
    fullName,
    cityId,
    postOfficeId,
    paymentType,
    productQuantity,
    purchaseComment,
  } = purchaseData;
  const modalInnerElement = modalWindow.querySelector(".modal-info");
  const productNamePurchased =
    productInfoElement.querySelector(".card-title").textContent;
  const productPrice = productInfoElement
    .querySelector(".card-price")
    .textContent.match(/\d+/);

  const cityObj = cityListAPI.find((c) => c.cityId === cityId);
  const { officeName } = cityObj.cityPostOffices.find(
    (o) => o.officeId === postOfficeId
  );

  modalInnerElement.innerHTML = `
  <h2>Purchase info</h2>
  <div>
    <p>You purchased x${productQuantity} ${productNamePurchased} for ${
    productPrice * productQuantity
  }$.</p>
    <p>Delivery city: ${cityObj.cityName}, ${officeName}</p>
    <p>Payment type: ${
      paymentType === "credit-card" ? "credit card now" : "after receiving"
    }</p>
    <p>Receiver: ${fullName}</p>
    ${
      purchaseComment.length > 0
        ? `<p>Your comment: ${purchaseComment}</p>`
        : ""
    }
  </div>
  `;

  let currentProductPurchase;
  categoriesMockAPI.forEach(({ products }) => {
    products.forEach((item) => {
      if (item.productName === productNamePurchased) {
        currentProductPurchase = item;
      }
    });
  });

  const currentPurchase = {
    ...currentProductPurchase,
    ...purchaseData,
    purchaseDate: new Date().toLocaleString("en-US"),
    personalKey: Date.now(),
  };
  const tempLocalStoragePurchases = getLocalStoragePurchase();
  tempLocalStoragePurchases.push(currentPurchase);
  localStorage.setItem("purchases", JSON.stringify(tempLocalStoragePurchases));

  showModal();
};

const formSubmitHandler = (e) => {
  e.preventDefault();

  const formElements = e.target.elements;
  const formData = {
    fullName: formElements["full-name"].value.trim(),
    cityId: formElements["city-select"].value,
    postOfficeId: formElements["post-office-select"].value,
    paymentType: formElements["payment-type"].value,
    productQuantity: formElements["product-quantity"].value,
    purchaseComment: formElements["purchase-comment"].value.trim(),
  };
  const regex = /^[a-zA-Z\s]+$/;

  if (formData.cityId === "null") {
    alert("You need select your city for delivery!");
    return;
  }

  if (!regex.test(formData.fullName)) {
    alert("Uncorrect full name! You can't enter number or symbols");
    return;
  }

  renderModalWindow(formData);
};

const showModal = () => {
  modalWindow.classList.remove("hide");
};

const hideModal = (e) => {
  if (e.target === modalWindow) {
    modalWindow.classList.add("hide");
  }
};

const fillPostOffices = ({ target: { value } }) => {
  const postOfficeElement = document.getElementById("post-office-select");
  postOfficeElement.textContent = "";

  const cityInfo = cityListAPI.find((c) => c.cityId === value);
  if (cityInfo) {
    cityInfo.cityPostOffices.forEach(({ officeId, officeName }) => {
      const postOfficeOption = document.createElement("option");

      postOfficeOption.value = officeId;
      postOfficeOption.textContent = officeName;
      postOfficeElement.appendChild(postOfficeOption);
    });
  }
};

const createFormCity = () => {
  const citySelectElement = document.getElementById("city-select");

  cityListAPI.forEach((item) => {
    const citySelectOption = document.createElement("option");

    citySelectOption.value = item.cityId;
    citySelectOption.textContent = item.cityName;
    citySelectElement.appendChild(citySelectOption);
  });

  citySelectElement.addEventListener("change", fillPostOffices);
};

const createCategoriesList = (categories) => {
  const categoryListElement = document.createElement("ul");
  categoryListElement.className = "categories-list";
  categoriesBlockElement.appendChild(categoryListElement);
  categoriesBlockElement.addEventListener("click", generateProductList);

  categories.forEach((element) => {
    const createdItemEl = document.createElement("li");
    createdItemEl.className = "categories-item";
    createdItemEl.textContent = element.categoryName;
    createdItemEl.dataset.type = element.categoryType;
    categoryListElement.appendChild(createdItemEl);
  });
};

const generateProductList = ({ target: { dataset } }) => {
  const currentCategoryType = dataset.type;
  if (!currentCategoryType) {
    return;
  }

  productsElement.textContent = "";
  productsElement.dataset.categoryIndex = categoriesMockAPI.findIndex(
    (c) => c.categoryType === currentCategoryType
  );

  const { categoryIndex } = productsElement.dataset;
  const { products } = categoriesMockAPI[categoryIndex];
  products.forEach((item) => {
    const productItemEl = document.createElement("article");
    productItemEl.className = "card card-shop";
    productItemEl.dataset.id = item.productId;
    productItemEl.innerHTML = `
      <div class="card-img-wrap">
        <img src="${item.imgUrl}" alt="${item.productName}"/>
      </div>
      <h3 class="card-title">${item.productName}</h3>`;

    productsElement.appendChild(productItemEl);
  });
};

const createPurchaseWindow = (e) => {
  const currentProductItemEl = e.target.closest(".card");
  if (!currentProductItemEl) {
    return;
  }

  if (currentProductItemEl.classList.contains("card-purchased")) {
    return;
  }

  const { categoryIndex } = productsElement.dataset;
  const { products } = categoriesMockAPI[categoryIndex];
  const { imgUrl, productName, price, productDisc } = products.find(
    (p) => p.productId === currentProductItemEl.dataset.id
  );

  const cardElement = productInfoElement.querySelector(".card-info");

  cardElement.innerHTML = `
    <article>
      ${getArticleMarkup({ imgUrl, productName })}
      <span class="card-price">Price: ${price}$</span>
      <p class="card-description">${productDisc}</p>
    </article>
    <button class="buy-button active">I want it!</button>`;

  const buyButton = cardElement.querySelector("button");
  buyButton.addEventListener("click", () => {
    purchaseForm.classList.toggle("hide");
  });
};

const showDetailedInfo = (e) => {
  const closestArticle = e.target.closest(".card");

  if (!closestArticle) {
    return;
  }

  if (e.target.classList.contains("remove-purchase")) {
    return;
  }

  const targetedElement = getLocalStoragePurchase().find(
    ({ productId }) => productId === closestArticle.dataset.id
  );

  if (closestArticle.classList.contains("card-purchased")) {
    const {
      productName,
      productQuantity,
      purchaseDate,
      productDisc,
      price,
      fullName,
      cityId,
      purchaseComment,
    } = targetedElement;
    const capitalizedCity = cityId.slice(0, 1).toUpperCase() + cityId.slice(1);
    const modalInnerElement = modalWindow.querySelector(".modal-info");

    modalInnerElement.innerHTML = `
    <h2>Detailed Purchase info</h2>
    <div>
      <p>Product name: ${productName}</p>
      <p>Quantity: ${productQuantity}</p>
      <p>Order date: ${purchaseDate}</p>
      <p>Product discription: ${productDisc}</p>
      <p>Price: ${price * productQuantity}$</p>
      <p>Custumer name: ${fullName}</p>
      <p>Delivery city: ${capitalizedCity}</p>
      ${
        purchaseComment.length > 0
          ? `<p>Your comment: ${purchaseComment}</p>`
          : ""
      }
    </div>`;

    showModal();
  }
};

const getArticleMarkup = ({ imgUrl, productName }) => {
  return `<div class='card-img-wrap'>
    <img src="${imgUrl}" alt="${productName}"/>
  </div>
  <h3 class="card-title">${productName}</h3>`;
};

const removePurchase = (e) => {
  const currentCard = e.target.closest(".card");
  const filteredPurchases = getLocalStoragePurchase().filter(
    ({ personalKey }) => personalKey !== +currentCard.dataset.key
  );

  localStorage.setItem("purchases", JSON.stringify(filteredPurchases));

  showUserPurchases();
};

const showUserPurchases = () => {
  productsElement.textContent = "";
  productInfo.textContent = "";
  purchaseForm.classList.add("hide");

  if (getLocalStoragePurchase().length <= 0) {
    productsElement.innerHTML = `
    <h1>You dont have any purchases rigth now ;(
    But you can change it! :3</h1>`;

    return;
  }

  getLocalStoragePurchase().forEach(
    ({
      productName,
      imgUrl,
      price,
      purchaseDate,
      productId,
      personalKey,
      productQuantity,
    }) => {
      const productItemEl = document.createElement("article");
      productItemEl.className = "card card-shop card-purchased";
      productItemEl.dataset.id = productId;
      productItemEl.dataset.key = personalKey;
      productItemEl.innerHTML = `
      <div class="card-img-wrap">
        <img src="${imgUrl}" alt="${productName}"/>
      </div>
      <h3 class="card-title">${productName}</h3>
      <div class="utils-info">
        <span>${purchaseDate}</span>
        <span>${price * productQuantity}$</span>
      </div>
      <button class="remove-purchase">Remove</button>
      `;

      productsElement.appendChild(productItemEl);
    }
  );

  const removePurchaseButtonEl = [
    ...document.querySelectorAll(".remove-purchase"),
  ];
  removePurchaseButtonEl.forEach((item) => {
    item.onclick = removePurchase;
  });
};

createCategoriesList(categoriesMockAPI);
createFormCity();
productsElement.addEventListener("click", createPurchaseWindow);
productsElement.addEventListener("click", showDetailedInfo);
myPurchaseButton.addEventListener("click", showUserPurchases);
purchaseForm.addEventListener("submit", formSubmitHandler);
modalWindow.addEventListener("click", hideModal);

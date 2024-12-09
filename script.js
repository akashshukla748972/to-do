const deleteItem = (items) => {
  //   alert(items);
  //   console.log(items);
  const getItems = JSON.parse(localStorage.getItem("todoList"));
  const newData = Object.values(getItems);
  const newItems = newData.filter((item, i) => items != item);
  localStorage.setItem("todoList", JSON.stringify(newItems));

  getAllItems();
};

const swal = (text, type) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: type,
    title: text,
  });
};

const editItem = (index) => {
  alert(index);
  const getItems = JSON.parse(localStorage.getItem("todoList"));
  const newData = Object.values(getItems);

  const item = newData.filter((item, i) => index == item);
  const SetItem = newData.filter((item, i) => index !== item);

  localStorage.setItem("todoList", JSON.stringify(SetItem));

  const setDataInInput = (document.getElementById("item").value = item);
  const setButtonText = (document.getElementById("getItem").textContent =
    "Save");
  console.log(item);

  //   localStorage.setItem("todoList", JSON.stringify(newItems));

  getAllItems();
};
const showItem = (item) => {
  Swal.fire({
    // title: "Selected Item",
    text: item,
    // icon: "success",
  });
};

const setDataInItemBody = (items) => {
  const body = document.getElementById("item-body");
  body.innerHTML = "";

  if (Object.values(items).length == 0) {
    let li = document.createElement("li");
    li.className = "text-center text-zinc-400";
    li.textContent = "Items not found...";
    body.appendChild(li);

    return;
  }

  let newItemsData = Object.values(items).reverse();

  newItemsData.forEach((item, index) => {
    const li = document.createElement("li");
    li.className =
      "px-5 py-2 text-xl bg-blue-50 hover:bg-blue-100 shadow-lg border-b-2 flex justify-between";
    li.innerHTML = `<p class="text-zinc-600">${item}</p> <div class="flex gap-4"> <span id="show" class="" ><img src="./assest/eye-line.svg" alt="" onclick="showItem('${item}')" class="w-[20px]" /></span> <span id="edit" class="" ><img src="./assest/edit-line.svg" alt="" onclick="editItem('${item}')"   class="w-[20px]" /></span> <span id="delete" class="" ><img src="./assest/delete-bin-line.svg" alt="" onclick="deleteItem('${item}')" class="w-[20px]" /></span> </div>`;

    body.appendChild(li);
  });
};

const getAllItems = () => {
  const items = JSON.parse(localStorage.getItem("todoList"));
  setDataInItemBody(items);
};

// selecting add item button
const getItem = document
  .getElementById("getItem")
  .addEventListener("click", () => {
    // getting item to input box
    const input = document.getElementById("item");
    const item = input.value;

    if (item.trim() === "") {
      swal("Please enter a valid item!", "error");
      return;
    }
    // creating a empty erray to store itme as a array
    const itemLists = [];
    itemLists.push(item);

    // getting prev data in localstorage
    const prevData = localStorage.getItem("todoList");

    const getItemButtonTextContent =
      document.getElementById("getItem").innerText;

    if (getItemButtonTextContent == "Save") {
      const editedItem = document.getElementById("item").value;
      const allItems = JSON.parse(localStorage.getItem("todoList"));
      const convertArray = Object.values(allItems);
      convertArray.push(editedItem);

      localStorage.setItem("todoList", JSON.stringify(convertArray));
      swal("Item updated successfully", "success");
      const setDataInInput = (document.getElementById("item").value = "");
      const setButtonText = (document.getElementById("getItem").textContent =
        "Add Item");
      getAllItems();
      return;
    }

    // check prev data exist or not
    if (!prevData) {
      // add data in localstorage
      localStorage.setItem("todoList", JSON.stringify(itemLists));
      swal("Item added successfully", "success");
      const items = JSON.parse(localStorage.getItem("todoList"));
      input.value = "";
      setDataInItemBody(items);
    }
    // check current data already exist or not
    else if (!prevData.includes(item)) {
      const prevItems = JSON.parse(localStorage.getItem("todoList"));
      prevItems.push(item);
      localStorage.setItem("todoList", JSON.stringify(prevItems));
      swal("Item added successfully", "success");
      const items = JSON.parse(localStorage.getItem("todoList"));
      input.value = "";
      setDataInItemBody(items);
    } else {
      // if item already exist
      const info = "Already exist";
      swal(info, "error");
      return;
    }
  });

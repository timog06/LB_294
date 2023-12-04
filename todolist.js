  var contador = 0,
  select_opt = 0; 

// Function to add a new item to the list
function add_to_list(action, title, description, date, id) {
  switch (action) {
    case "SHOPPING":
      select_opt = 0;
      break;
    case "WORK":
      select_opt = 1;
      break;
    case "SPORT":
      select_opt = 2;
      break;
    case "MUSIC":
      select_opt = 3;
      break;
    default:
      select_opt = 0;
  }

  var class_li = [
    "list_shopping list_dsp_none",
    "list_work list_dsp_none",
    "list_sport list_dsp_none",
    "list_music list_dsp_none",
  ];

  var deleteLink =
    '<a href="javascript:void(0);" onclick="deleteTodo(\'' +
    id +
    '\');"><i class="material-icons">&#xE5CA;</i></a>';

  var cont =
    '<div class="col_md_1_list"><p>' +
    action +
    '</p></div><div class="col_md_2_list"><h4>' +
    title +
    "</h4><p>" +
    description +
    '</p></div><div class="col_md_3_list"><div class="cont_text_date"><p>' +
    date +
    '</p></div><div class="cont_btns_options"><ul><li>' +
    deleteLink +
    "</li></ul></div></div>";

  var li = document.createElement("li");
  li.className = class_li[select_opt] + " li_num_" + contador;
  li.innerHTML = cont;
  document.querySelectorAll(".cont_princ_lists > ul")[0].appendChild(li);

  setTimeout(function () {
    li.style.display = "block";
  }, 100);

  setTimeout(function () {
    li.className =
      "list_dsp_true " + class_li[select_opt] + " li_num_" + contador;
    contador++;
  }, 200);
}

// Function to add a new item from a form
function add_from_form() {
  var action = document.querySelector("#action_select").value,
    title = document.querySelector(".input_title_desc").value,
    description = document.querySelector(".input_description").value,
    date = document.getElementById("date_select").value;

  var newTodo = {
    action: action,
    title: title,
    description: description,
    date: date,
  };

  // Make a POST request to add the new todo
  fetch("http://localhost:2940/api/v1/entities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("New todo added:", data);
      add_to_list(action, title, description, date, data.id);
    })
    .catch((error) => {
      console.error("Error adding new todo:", error);
    });
}

// Function to mark an item as finished
function finish_action(num, num2) {
  var class_li = [
    "list_shopping list_dsp_true",
    "list_work  list_dsp_true",
    "list_sport list_dsp_true",
    "list_music list_dsp_true",
  ];
  console.log(".li_num_" + num2);
  document.querySelector(".li_num_" + num2).className =
    class_li[num] + " list_finish_state";
  setTimeout(function () {
    del_finish();
  }, 500);
}

// Function to delete finished items
function del_finish() {
  var li = document.querySelectorAll(".list_finish_state");
  for (var e = 0; e < li.length; e++) {
    li[e].style.opacity = "0";
    li[e].style.height = "0px";
    li[e].style.margin = "0px";
  }

  setTimeout(function () {
    var li = document.querySelectorAll(".list_finish_state");
    for (var e = 0; e < li.length; e++) {
      li[e].parentNode.removeChild(li[e]);
    }
  }, 500);
}

var t = 0;

// Function to add a new item
function add_new() {
  if (t % 2 == 0) {
    document.querySelector(".cont_crear_new").className =
      "cont_crear_new cont_crear_new_active";

    document.querySelector(".cont_add_titulo_cont").className =
      "cont_add_titulo_cont cont_add_titulo_cont_active";
    t++;
  } else {
    document.querySelector(".cont_crear_new").className = "cont_crear_new";
    document.querySelector(".cont_add_titulo_cont").className =
      "cont_add_titulo_cont";
    t++;
  }
}

let todos = [];

// Function to load todos from the server
function loadToDos() {
  fetch("http://localhost:2940/api/v1/entities")
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      displayTodos();
    })
    .catch((error) => {
      console.error("Error loading todos:", error);
    });
}

// Function to display todos in the list
function displayTodos() {
  const ul = document.querySelector(".cont_princ_lists > ul");
  ul.innerHTML = "";
  todos.forEach((todo) => {
    console.log("Displaying todo:", todo);
    add_to_list(todo.action, todo.title, todo.description, todo.date, todo.id);
  });
}

// Function to delete a todo item
function deleteTodo(id) {
  fetch(`http://localhost:2940/api/v1/entities/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Todo deleted:", id);
      loadToDos();
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
    });
}

// Load todos when the page is loaded
document.addEventListener("DOMContentLoaded", loadToDos);

var contador = 0,
  select_opt = 0;

function add_to_list(action, title, description, date) {
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
  }

  var class_li = [
    "list_shopping list_dsp_none",
    "list_work list_dsp_none",
    "list_sport list_dsp_none",
    "list_music list_dsp_none",
  ];

  var cont =
    '<div class="col_md_1_list"><p>' +
    action +
    "</p></div>" +
    '<div class="col_md_2_list"><h4>' +
    title +
    "</h4><p>" +
    description +
    "</p></div>" +
    '<div class="col_md_3_list"><div class="cont_text_date"><p>' +
    date +
    "</p></div>" +
    '<div class="cont_btns_options"><ul><li><a href="#finish" onclick="finish_action(' +
    select_opt +
    ", " +
    contador +
    ');"><i class="material-icons">&#xE5CA;</i></a></li></ul></div></div>';

  var li = document.createElement("li");
  li.className = class_li[select_opt] + " li_num_" + contador;
  li.innerHTML = cont;
  document.querySelectorAll(".cont_princ_lists > ul")[0].appendChild(li);

  setTimeout(function () {
    document.querySelector(".li_num_" + contador).style.display = "block";
  }, 100);

  setTimeout(function () {
    document.querySelector(".li_num_" + contador).className =
      "list_dsp_true " + class_li[select_opt] + " li_num_" + contador;
    contador++;
  }, 200);
}

function add_from_form() {
  var action = document.querySelector("#action_select").value,
    title = document.querySelector(".input_title_desc").value,
    description = document.querySelector(".input_description").value,
    date = document.getElementById("date_select").value;

  saveToDo({
    action: action,
    title: title,
    description: description,
    date: date,
  });
  add_to_list(action, title, description, date);
}

function saveToDo(todo) {
  fetch("http://localhost:2940/api/v1/entities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteTodoById(id) {
  fetch(`http://localhost:2940/api/v1/entities/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Successfully deleted:", data);
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
    });
}


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

let loadToDos = function () {
  fetch("http://localhost:2940/api/v1/entities")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todoList) => {
        todoList.forEach((todo) => {
          add_to_list(todo.action, todo.title, todo.description, todo.date);
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });
};

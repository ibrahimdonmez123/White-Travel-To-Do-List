














document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todoForm");
    const inputText = document.getElementById("todoText");
    const inputDate = document.getElementById("todoDate");
    const selectResponsible = document.getElementById("todoResponsible");
    const priorityButtons = document.querySelectorAll(".priorityBtn");
    const inputPriority = document.getElementById("todoPriority");
    const showCompletedButton = document.getElementById("showCompleted");
    const showResponsibleButton = document.getElementById("showResponsible");
    const todoList = document.getElementById("todoList");
    
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let filter = "all";
    let selectedResponsible = "";
    
    function renderTodos() {
      todoList.innerHTML = "";
      let filteredTodos = todos;
      
      if (filter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
      } else if (filter === "responsible") {
        filteredTodos = todos.filter(todo => todo.responsible === selectedResponsible);
      }
      
      filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.classList.add("todoItem");
        if (todo.started) li.classList.add("started");
        if (todo.completed) li.classList.add("completed");
        
        li.innerHTML = `
          ${todo.text} - ${todo.date} - ${todo.responsible} - ${["", "Az Acil", "Orta Acil", "Çok Acil"][todo.priority]}
          <button class="startBtn">Başla</button>
          <button class="completeBtn">Tamamla</button>
          <button class="deleteBtn">Sil</button>
        `;
        
        li.querySelector(".startBtn").addEventListener("click", () => {
          todo.started = !todo.started;
          saveTodos();
          renderTodos();
        });
        
        li.querySelector(".completeBtn").addEventListener("click", () => {
          todo.completed = !todo.completed;
          saveTodos();
          renderTodos();
        });
        
        li.querySelector(".deleteBtn").addEventListener("click", () => {
          todos = todos.filter(t => t !== todo);
          saveTodos();
          renderTodos();
        });
        
        todoList.appendChild(li);
      });
    }
    
    function saveTodos() {
      todos.sort((a, b) => a.date.localeCompare(b.date) || b.priority - a.priority || (a.started && !b.started ? -1 : 0));
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    
    form.addEventListener("submit", e => {
      e.preventDefault();
      todos.push({
        text: inputText.value,
        date: inputDate.value,
        responsible: selectResponsible.value,
        priority: parseInt(inputPriority.value),
        started: false,
        completed: false
      });
      saveTodos();
      renderTodos();
      form.reset();
    });
    
    priorityButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        priorityButtons.forEach(b => b.classList.toggle("active", b === btn));
        inputPriority.value = btn.dataset.priority;
      });
    });
    
    showCompletedButton.addEventListener("click", () => {
      filter = filter === "completed" ? "all" : "completed";
      renderTodos();
    });
    
    
showResponsibleButton.addEventListener("click", () => {
    selectedResponsible = prompt("Sorumlu kişi seçin (Levent, Burak, İbrahim):");
    if (selectedResponsible === "Levent" || selectedResponsible === "Burak" || selectedResponsible === "Ibrahim") {
      filter = filter === "responsible" && selectedResponsible === selectResponsible.value ? "all" : "responsible";
      renderTodos();
    } else {
      alert("Lütfen geçerli bir sorumlu ismi girin.");
    }
  });
  
  
    renderTodos();
  });
    
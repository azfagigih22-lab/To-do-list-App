const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const allBtn = document.getElementById('allBtn');
    const completedBtn = document.getElementById('completedBtn');
    const pendingBtn = document.getElementById('pendingBtn');
        // array kosong untuk menyimpan tugas
    let tasks = []; 

    function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
      let filteredTasks = tasks;

      if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
      } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
      }

      filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
          <div class="task-buttons">
            <button class="complete-btn" onclick="toggleComplete(${index})">${task.completed ? 'Batal' : 'Selesai'}</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Hapus</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
      }
    }

    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    allBtn.addEventListener('click', () => renderTasks('all'));
    completedBtn.addEventListener('click', () => renderTasks('completed'));
    pendingBtn.addEventListener('click', () => renderTasks('pending'));
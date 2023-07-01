// Vuex Store
const store = new Vuex.Store({
    state: {
      tasks: [],
      newTask: ""
    },
    mutations: {
      ADD_TASK(state) {
        if (state.newTask.trim() !== "") {
          state.tasks.push(state.newTask);
          state.newTask = "";
        }
      },
      EDIT_TASK(state, { index, task }) {
        if (task.trim() !== "") {
          state.tasks.splice(index, 1, task);
        }
      },
      DELETE_TASK(state, index) {
        state.tasks.splice(index, 1);
      }
    },
    actions: {
      addTask({ commit }) {
        commit("ADD_TASK");
      },
      editTask({ commit }, { index, task }) {
        commit("EDIT_TASK", { index, task });
      },
      deleteTask({ commit }, index) {
        commit("DELETE_TASK", index);
      }
    }
  });
  
  // Vue App
  const app = new Vue({
    el: "#app",
    store,
    computed: {
      tasks() {
        return this.$store.state.tasks;
      },
      newTask: {
        get() {
          return this.$store.state.newTask;
        },
        set(value) {
          this.$store.state.newTask = value;
        }
      }
    },
    methods: {
      addTask() {
        this.$store.dispatch("addTask");
      },
      editTask(index) {
        const task = prompt("Edit the task", this.tasks[index]);
        this.$store.dispatch("editTask", { index, task });
      },
      deleteTask(index) {
        this.$store.dispatch("deleteTask", index);
      }
    }
  });
  
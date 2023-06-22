<template>
  <div>
    <h1 class="display-1 mb-3">TODO LIST</h1>
    <div class="container">
      <div class="row mb-3">
        <div class="col-10"><input type="text" class="form-control" placeholder="Do the Kitchen" v-model="models.todo_item" @keyup.enter="addTodo" /></div>
        <div class="col-2 d-grid"><button type="button" class="btn btn-outline-primary" @click="addTodo">Add</button></div>
      </div>
      <table class="table table-bordered">
        <thead>
          <th></th>
          <th></th>
          <th>TODO</th>
          <th>Date</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id">
            <td width="2%">{{ index + 1 }}</td>
            <td>
              <input class="form-check-input" type="checkbox" v-model="item.is_done" @click="updateTodo('updateStatus', !item.is_done, item.id)" />
            </td>
            <td>
              <input type="text" class="form-control" placeholder="Do the Kitchen" v-model="item.todo_item" @click="updateTodo('updateTodo', item.todo_item, item.id)" v-if="!item.is_done" />
              <p class="done-todo" v-if="item.is_done">
                {{ item.todo_item }} - <i>{{ dateFormat(item.is_done_at) }}</i>
              </p>
            </td>
            <td>{{ dateFormat(item.createdAt) }}</td>
            <td width="2%">
              <button type="button" class="btn btn-sm btn-outline-primary" @click="updateTodo('updateTodo', item.todo_item, item.id)">Update</button>
            </td>
            <td width="2%">
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteTodo(item.id, item.todo_item)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex flex-center">
        <div>
          <p class="mb-3" v-if="totalRecords === 0">No available data ...</p>
          <p class="mb-3" v-else>{{ displayRange }}</p>
        </div>
      </div>

      <nav aria-label="Page navigation example" v-if="totalPage.length">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" @click="previousPage(currentPage)">Previous</a>
          </li>
          <li class="page-item" v-for="(item, index) in totalPage" :key="index">
            <a class="page-link" :class="{ 'bg-secondary text-white': currentPage == item }" @click="movePage(item)">{{ item }}</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" @click="nextPage(currentPage)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import TodoService from "../services/TodoService";
import moment from "moment";

export default {
  name: "TodoList",
  props: {},
  data() {
    return {
      // page requisites
      currentPage: 0,
      totalPage: 0,
      totalRecords: 0,
      data: null,
      page: 0,
      size: 10,

      // in page data models
      models: {
        todo_item: "",
      },
    };
  },
  methods: {
    async getAllTodo() {
      await TodoService.index(this.page, this.size).then((data) => {
        this.data = data.data.pageData;
        this.currentPage = data.data.page;
        this.totalPage = data.data.totalPages;
        this.totalRecords = data.data.totalRecords;
      });
    },
    async addTodo() {
      try {
        await TodoService.createData(this.models).then(() => {
          alert("TODO Added!");
          this.models.todo_item = "";
          this.getAllTodo();
        });
      } catch (err) {
        console.log(err);
      }
    },
    async updateTodo(mode, value, id) {
      let data = null;
      if (mode == "updateTodo") {
        data = {
          id: id,
          todo_item: value,
        };
      }

      if (mode == "updateStatus") {
        data = {
          id: id,
          is_done: value,
          is_done_at: moment(),
        };
      }
      try {
        await TodoService.putData(data).then(() => {
          this.getAllTodo();
        });
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTodo(id, value) {
      try {
        if (confirm("Really delete? " + value)) {
          await TodoService.deleteData(id).then(() => {
            this.getAllTodo();
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    dateFormat: function (dateTime) {
      let parseFirst = moment(dateTime);
      let output = moment(parseFirst).format("MMM DD, YYYY, h:mm a");
      return output;
    },
    async movePage(value) {
      this.page = value;
      this.getAllTodo();
    },
    previousPage(value) {
      if (value > 1) {
        let page = value - 1;
        this.movePage(page);
      }
    },
    nextPage(value) {
      if (value < this.totalPage) {
        let page = value + 1;
        console.log(page);
        this.movePage(page);
      }
    },
  },
  mounted() {
    this.getAllTodo();
  },
  computed: {
    displayRange() {
      const start = (this.currentPage - 1) * this.size + 1;
      const end = Math.min(start + this.size - 1, this.totalRecords);
      return `Displaying records ${start}-${end} out of ${this.totalRecords} records`;
    },
    recordCount() {
      return `Total records: ${this.totalRecords}`;
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}
.done-todo {
  text-align: left;
  text-decoration: line-through;
}
</style>

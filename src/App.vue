<template>
  <div class="container">
    <h1 class="title">Todo List</h1>

    <md-field>
      <md-button @click="addTodo()" class="md-icon-button addItem">
        <md-icon>add</md-icon>
      </md-button>
      <md-input class="add" v-model="currentTodo" @keyup.enter="addTodo()" placeholder="Add a todo..."></md-input>
    </md-field>

    <md-list class="todos">
      <md-list-item v-for="(todo, index) in todos" :key="todo.id" @dblclick="editTodo(index)" class="todo" :class="{completed: todo.completed}">

        <md-checkbox v-model="todo.completed" value="todo.completed" @change="completeTodo(todo)">
          <label v-if="!todo.edit">{{ todo.label }}</label>
          <input class="edit" type="text" v-model="todo.label" v-if="todo.edit" v-focus @blur="doneEdit(index)" @keyup.enter="doneEdit(index)">
        </md-checkbox>

        <md-button class="remove" @click="removeTodo(todo)">X</md-button>
      </md-list-item>
    </md-list>

    <footer v-show="todos.length > 0">
      <md-button class="clear" @click="removeCompleted()">Clear completed</md-button>
    </footer>
    <p class="message">*Click on a Todo once to complete twice to edit</p>
  </div>

</template>


<script>
  const focus = {
    inserted(el) {el.focus()}
  };

  export default {
    data() {
      return {
        todos: [],
        currentTodo: ''
      };
    },
    directives: { focus },
    methods: {
      addTodo() {
        if (this.currentTodo !== "") {
          this.todos.push({id: this.todos.length, label: this.currentTodo, completed: false, edit: false
          });
        }
        this.currentTodo = "";
      },
      completeTodo(todo) {
        if (todo.completed === true) {
          todo.completed = false;
        }
        if (todo.completed === false) {
          todo.completed = true;
        }
      },
      editTodo(index) {
        this.todos[index].edit = true;
      },
      doneEdit(index) {
        this.todos[index].edit = false;
      },
      removeTodo(todo) {
        var index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      },
      removeCompleted() {
        this.todos = this.todos.filter(function(todo) {
          return !todo.completed;
        });
      }
    }//methods
  };
</script>


<style>
  body{
    background-image: linear-gradient(to  left, #1ea896, #009faf, #0092c3, #0081cb, #5c6bc0);
    padding: 3%;
    height: 100%;
  }

  .container{
    max-width: 80%;
    background-color: white;
    padding: 1%;
    text-align: center;
    width: 60%;
    margin: 0 auto 40px auto;
  }

  .title{
    font-weight: 700;
    font-size: 46px;
    text-align: center;
    width: 95%;
  }

  input{
    padding: 10px;
    margin: 0 auto;
    outline: none
  }

  .edit{
    color: #1ea896;
    font-size: 1em;
    padding:1px;
  }

  label {
    position: absolute;
    top: -20%;
  }

  .md-input{
    width: inherit
  }

  .remove{
    color: #1ea896;
  }

  footer {
    display: flex;
  }

  .clear {
    background-color: #1ea896;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
  }

  .clear:hover {
    background-color: #1ea896ce;
    color: rgba(0, 0, 0, 0.699)
  }

  .message{
    margin: 60px 0 -10px 0;
    font-size: 0.8rem;
    color: grey
  }

  .md-button:not([disabled]).md-focused:before,
  .md-button:not([disabled]):active:before,
  .md-button:not([disabled]):hover:before {
    background-color: transparent;
  }

  .md-checkbox,
  .md-checkbox-container,
  .md-list-item-content > .md-checkbox:first-child {
    margin: 0px;
    padding: 0px;
  }

  .md-checkbox .md-checkbox-container {
    border: 0.7px solid #1ea896;
    margin-left: 12px;
  }

  .md-checkbox.md-checked .md-checkbox-container:after {
    border-color: #1ea896;
  }

  .md-checkbox.md-theme-default {
    background: transparent;
  }

  .md-input.add {
    position: absolute;
    top: 30%;
    left: 15%;
    font-size: 18px;
  }

  .md-field.md-theme-default.md-has-placeholder {
    background-color: #1ea896;
    max-width: 95%;
    border-radius: 3px;
    margin-bottom: 1.5%;
    padding: 12px;
  }

  .md-input::-webkit-input-placeholder,
  .addItem {
    color: #ffffff;
    padding-left: 2%;
  }

  .md-input {
    color: #000000;
  }

  .md-list-item {
    width: 95%;
    display: inline-block;
    border: 1px solid #1ea896;
    margin-bottom: 1%;
  }

  .md-list-item-fake-button.md-list-item-container.md-button-clean {
    max-width: 100%;
  }

  .md-list-item-content.md-ripple,
  .md-button .md-ripple,
  .md-ripple,
  .md-button-content {
    background: transparent;
    margin: 0px;
    padding: 0px;
    min-width: 100%;
  }

  .todo.completed label {
    text-decoration: line-through;
    color: #00000073;
  }


  @media all and (max-width: 750px) {
    body{
      height: 90%;
      font-size: 18px;
    }

    .clear {
      width: 100%;
    }

    .container {
      padding: 4%;
      padding-bottom: 7%;
      min-width: 97%;
    }

    footer {
      flex-direction: column;
      padding: 0px;
    }

    .title {
      font-size: 30px;
    }

    .md-button {
      margin: 0px;
    }

    .md-field,
    .md-list-item,
    footer {
      min-width: 100%;
    }

    .md-input.add {
      left: 20%;
    }

    .remove {
      position: absolute;
      right: 28%;
    }
  }

</style>

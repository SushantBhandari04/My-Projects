# File-based Todo App

This is a simple file-based Todo application built using Express.js. It allows users to create, read, update, and delete todo items using postman, which are stored in a local file.

## Features

- Add new todo items
- View all todo items
- View particular todo item
- Update existing todo items
- Delete todo items
- Delete all todo items

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/SushantBhandari04/Projects/File-based-todo-app.git
    ```
2. Navigate to the project directory:
    ```sh
    cd File-based-todo-app
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Run node index.js
    ```
2. Open your browser and navigate to `http://localhost:3000` to use the application.

## API Endpoints

- `GET /todos/get/all` - Retrieve all todo items
- `GET /todos/get/:<id>` - Retrieve particular todo item
- `POST /todos/create` - Add a new todo item
- `PUT /todos/update/:<id>` - Update a todo item by ID
- `DELETE /todos/delete/:<id>` - Delete a todo item by ID
- `DELETE /todos/delete/all` - Delete all todo items

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

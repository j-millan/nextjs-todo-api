import { TodoItem } from "@prisma/client";

export interface CreateTodoItemDto {
  description: string;
  compelted?: boolean;
}

export interface UpdateTodoItemDto {
  description?: string;
  completed?: boolean;
}

export const updateTodo = async (
  id: string,
  data: UpdateTodoItemDto
): Promise<TodoItem> => {
  const url = "/api/todo-items/" + id;
  const request = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(url, request)
    .then((res) => res.json())
    .catch((err) => {
      console.debug(err);
    });
};

export const createTodo = async (data: CreateTodoItemDto): Promise<TodoItem> => {
  const url = "/api/todo-items/";
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(url, request)
    .then((res) => res.json())
    .catch((err) => {
      console.debug(err);
    });
};

export const deleteTodo = async (id?: string): Promise<void> => {
  const url = `/api/todo-items/${id || ''}`;
  const request = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(url, request)
    .then((res) => res.json())
    .catch((err) => {
      console.debug(err);
    });
}

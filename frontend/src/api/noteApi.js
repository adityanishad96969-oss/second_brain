import api from "./api";

export const createNote = async (note) => {
  const response = await api.post("/notes/", note);
  return response.data;
};
export const getNotes = async () => {
  const response = await api.get("/notes/");
  return response.data;
};
export const deleteNote = async (title) => {
  const response = await api.delete(`/notes/${title}`);
  return response.data;
};
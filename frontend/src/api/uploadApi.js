import api from "./api";

export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
        console.log("Progress:", percent);

      if (onProgress) {
        onProgress(percent);
      }
    },
  });

  return response.data;
};

export const deleteFile = async (filename) => {
  const response = await api.delete(`/upload/${filename}`);
  return response.data;
};

export const getFiles = async () => {
  const response = await api.get("/upload/files");
  return response.data;
};
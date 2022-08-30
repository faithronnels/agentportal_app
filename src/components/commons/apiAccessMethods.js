export const createFormData = async (formInput) => {
  const formData = new FormData();
  for (const key in formInput) {
    if (formInput.hasOwnProperty(key)) {
      formData.append(key.toString(), formInput[key]);
    }
  }
  return formData;
};

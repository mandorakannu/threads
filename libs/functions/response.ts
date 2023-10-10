export const apiResponse = async (message: string, statusCode: number) => {
  const response = {
    title: "",
    description: "",
    isOpen: true,
  };
  if (statusCode === 200) {
    response.title = "Success";
    response.description = message;
    return response;
  } else {
    response.title = "Error";
    response.description = message;
    return response;
  }
};

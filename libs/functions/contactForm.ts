export const addClient = async (statusCode: number) => {
  const details = {
    title: "",
    description: "",
    isOpen: true,
  };
  switch (statusCode) {
    case 200:
      details.title = "Success";
      details.description = "Your message has been sent successfully.";
      return details;
    case 400:
      details.title = "Error";
      details.description = "Something went wrong.";
      return details;
    case 500:
      details.title = "Error";
      details.description = "Internal Server Error.";
      return details;
    default:
      details.title = "Error";
      details.description = "Something went wrong.";
      return details;
  }
};

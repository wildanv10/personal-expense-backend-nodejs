export const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

export const allowCORSMiddleware = (allowCors) => {
  return (request, response, next) => {
    if (allowCors) {
      response.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
      response.header("Access-Control-Allow-Credentials", "true");
    }

    next();
  };
};

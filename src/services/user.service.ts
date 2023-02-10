import boom from "@hapi/boom";

const userService = {
  create: (data: any) => {
    if (!data.names) {
      throw boom.notFound("No envio nada omee");
    }
    return data;
  },
};

export = userService;

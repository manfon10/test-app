const boom = require("@hapi/boom");

const Client = require("../models/client.model");
const Product = require("../models/product.model");
const Project = require("../models/project.model");

const clientService = {
  /**
   * Create client
   * @param { Object } data - Data client
   * @returns { Object } Client data
   */

  createClient: async (data) => {
    const client = await Client.create(data);

    return await clientService.findClient({ id: client.id });
  },

  /**
   * Delete client
   * @param { Object } filters - filters
   * @returns { Array } Rows afected
   */

  deleteClient: async (filters) => {
    await clientService.findClient(filters);

    return await Client.destroy({ where: filters });
  },

  /**
   * Get client
   * @param { Object } filters - filters
   * @returns { Object } Client data
   */

  findClient: async (filters) => {
    const client = await Client.findOne({
      include: {
        model: Project,
        as: "project",
        attributes: ["id", "name"],
        include: {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            "part_number",
            "cycle_time",
            "engineering_level",
          ],
        },
      },
      attributes: ["id", "name"],
      where: filters,
    });

    if (!client) {
      throw boom.badRequest("Client does not exist");
    }

    return client;
  },

  /**
   * Get clients
   * @param { Object } filters - filters
   * @returns { Object } Clients data
   */

  findClients: async (filters) => {
    const clients = await Client.findAll({
      include: {
        model: Project,
        as: "project",
        attributes: ["id", "name"],
        include: {
          model: Product,
          as: "product",
          attributes: [
            "id",
            "name",
            "part_number",
            "cycle_time",
            "engineering_level",
          ],
        },
      },
      attributes: ["id", "name"],
      where: filters,
    });

    return clients;
  },

  /**
   * Update client
   * @param { Object } data - Data client to update
   * @param { Object } filters - filters
   * @returns { Object } Client data update
   */

  updateClient: async (data, filters) => {
    await Client.update(data, { where: filters });

    return await clientService.findClient(filters);
  },
};

module.exports = clientService;
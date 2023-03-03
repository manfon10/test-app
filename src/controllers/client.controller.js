const clientService = require("../services/client.service");

const createClient = async (req, res, next) => {
  try {
    const body = req.body;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const newClient = await clientService.createClient({ ...body, branch_id });

    res.status(201).json({ newClient });
  } catch (error) {
    next(error);
  }
};

const getClientByid = async (req, res, next) => {
  try {
    const id = req.params;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const client = await clientService.findClient({ ...id, branch_id });

    res.status(200).json({ client });
  } catch (error) {
    next(error);
  }
};

const getAllClients = async (req, res, next) => {
  try {
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const clients = await clientService.findClients({ branch_id });

    res.status(200).json({ clients });
  } catch (error) {
    next(error);
  }
};

const deleteClientById = async (req, res, next) => {
  try {
    const id = req.params;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    await clientService.deleteClient({ ...id, branch_id });

    res.status(201).json({ message: "Client deleted" });
  } catch (error) {
    next(error);
  }
};

const updateClientById = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const client = await clientService.updateClient({ ...body, branch_id }, id);

    res.status(201).json({ client });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getClientByid,
  getAllClients,
  deleteClientById,
  updateClientById,
};

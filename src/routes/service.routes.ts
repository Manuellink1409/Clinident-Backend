import { Router } from "express";
import {
  allServices,
  createService,
  deleteService,
  getService,
  updateService,
} from "../controllers/service.controller";
import { zParse } from "..";
import {
  createServiceSchema,
  deleteServiceSchema,
  getServiceSchema,
  updateServiceSchema,
} from "../schema/service.schema";

const router = Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const services = await allServices();
      return res.status(200).json(services);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { body } = await zParse(createServiceSchema, req);
      const services = await createService(body);
      return res.status(201).json(services);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const { params } = await zParse(getServiceSchema, req);
      const service = await getService(params);
      return res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { params, body } = await zParse(updateServiceSchema, req);
      const service = await updateService(params, body);
      return res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { params } = await zParse(deleteServiceSchema, req);
      const service = await deleteService(params);
      return res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  });
export default router;

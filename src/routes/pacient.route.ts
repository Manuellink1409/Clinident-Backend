import { Router } from "express";
import {
  allPacients,
  createPacient,
  deletePacient,
  getPacient,
  updatePacient,
} from "../controllers/pacient.controller";
import { zParse } from "..";
import {
  createPacientSchema,
  deletePacientSchema,
  getPacientSchema,
  updatePacientSchema,
} from "../schema/pacient.schema";

const router = Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const pacients = await allPacients();
      return res.status(200).json(pacients);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { body } = await zParse(createPacientSchema, req);
      const pacients = await createPacient(body);
      return res.status(201).json(pacients);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const { params } = await zParse(getPacientSchema, req);
      const pacient = await getPacient(params);
      return res.status(200).json(pacient);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { params, body } = await zParse(updatePacientSchema, req);
      const pacient = await updatePacient(params, body);
      return res.status(200).json(pacient);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { params } = await zParse(deletePacientSchema, req);
      const pacient = await deletePacient(params);
      return res.status(200).json(pacient);
    } catch (error) {
      next(error);
    }
  });
export default router;

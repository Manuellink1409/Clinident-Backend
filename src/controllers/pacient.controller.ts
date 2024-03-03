import prisma from "../db/prisma";
import type { Pacient } from "@prisma/client";

type UpdatePacientType = Partial<Pacient>;
type CreatePacientType = Pick<Pacient, "name" | "email" | "phone">;
type SinglePacientType = Pick<Pacient, "id">;

export const createPacient = async (pacient: CreatePacientType) => {
  try {
    return await prisma.pacient.create({
      data: pacient,
    });
  } catch (error) {
    throw error;
  }
};

export const allPacients = async () => {
  try {
    return await prisma.pacient.findMany();
  } catch (error) {
    throw error;
  }
};

export const getPacient = async (pacient: SinglePacientType) => {
  try {
    return await prisma.pacient.findUniqueOrThrow({
      where: {
        id: pacient.id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deletePacient = async (pacient: SinglePacientType) => {
  try {
    return await prisma.pacient.delete({
      where: {
        id: pacient.id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updatePacient = async (
  pacientParams: SinglePacientType,
  pacientBody: UpdatePacientType
) => {
  try {
    return await prisma.pacient.update({
      where: {
        id: pacientParams.id,
      },
      data: pacientBody,
    });
  } catch (error) {
    throw error;
  }
};

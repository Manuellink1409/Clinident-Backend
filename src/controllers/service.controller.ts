import prisma from "../db/prisma";
import type { Service } from "@prisma/client";

type UpdateServiceType = Partial<Service>;
type CreateServiceType = Pick<Service, "name" | "price">;
type SingleServiceType = Pick<Service, "id">;

export const createService = async (service: CreateServiceType) => {
  try {
    return await prisma.service.create({
      data: service,
    });
  } catch (error) {
    throw error;
  }
};

export const allServices = async () => {
  try {
    return await prisma.service.findMany();
  } catch (error) {
    throw error;
  }
};

export const getService = async (service: SingleServiceType) => {
  try {
    return await prisma.service.findUniqueOrThrow({
      where: {
        id: service.id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteService = async (service: SingleServiceType) => {
  try {
    return await prisma.service.delete({
      where: {
        id: service.id,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateService = async (
  serviceParams: SingleServiceType,
  serviceBody: UpdateServiceType
) => {
  try {
    return await prisma.service.update({
      where: {
        id: serviceParams.id,
      },
      data: serviceBody,
    });
  } catch (error) {
    throw error;
  }
};

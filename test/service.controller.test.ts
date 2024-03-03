import prisma from "../src/db/prisma";
import {
  createService,
  allServices,
  deleteService,
  getService,
  updateService,
} from "../src/controllers/service.controller";
import type { Service } from "@prisma/client";

beforeAll(async () => {
  await prisma.service.createMany({
    data: [
      { name: "Todo 1", price: "500" },
      { name: "Todo 2", price: "400" },
    ],
  });
  console.log("✨ Seeded db with 2 services");
});
afterAll(async () => {
  const deleteServices = prisma.service.deleteMany();
  await prisma.$transaction([deleteServices]);
  await prisma.$disconnect();
});
test("allServices: should get all services", async () => {
  const services = await allServices();
  expect(services).toMatchObject<Service[]>;
});
test("createService: should create a service", async () => {
  const services = await createService({ name: "test", price: "test" });
  expect(services).toMatchObject<Service>;
});
test("updateSerive: should update a service", async () => {
  const services = await updateService(
    { id: 1 },
    { name: "test", price: "400" }
  );
  expect(services).toMatchObject<Service>;
});
test("getService: should get a service", async () => {
  const services = await getService({ id: 1 });
  expect(services).toMatchObject<Service>;
});
test("deleteService: should delete a service", async () => {
  const services = await deleteService({ id: 1 });
  expect(services).toMatchObject<Service>;
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// id        String   @id @default(uuid())
//   name      String   @db.VarChar(255)
//   image_url String   @db.Text
//   Price     Int      @db.Int
//   Orders
async function createProduct({ data }) {
  const product = await prisma.products.create({
    data: data,
  });

  return product;
}

async function updateProduct({ data }) {
  const product = await prisma.products.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      image_url: data.image_url,
      Price: data.price,
    },
  });

  return product;
}

async function deleteProduct({ id }) {
  const product = await prisma.products.delete({
    where: {
      id: id,
    },
  });

  return product;
}

async function findProduct({ name }) {
  const product = await prisma.products.findUnique({
    where: {
      name: name,
    },
  });
  return product;
}

export { findProduct, deleteProduct, updateProduct, createProduct };

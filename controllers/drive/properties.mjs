import prisma from "../../config/prisma.mjs";

async function propertiesGet(req, res) {
  try {
    const directory = await prisma.directory.findUnique({
      where: {
        id: parseInt(req.params.dirId),
      },
    });
    return res.render("properties", { directory });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

export { propertiesGet };

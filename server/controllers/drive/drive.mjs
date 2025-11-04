import prisma from "../../config/prisma.mjs";
import supabase from "../../config/supabase.mjs";

async function driveGet(req, res) {
  try {
    const dirPath = req.params.dirPath.toString().replaceAll(",", "/");
    const directory = await prisma.directory.findFirst({
      where: {
        path: dirPath,
        userId: req.user,
      },
      include: {
        contents: true,
        parent: true,
      },
    });

    return res.status(200).json({
      directory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      err,
    });
  }
}

async function fileGet(req, res) {
  const dirPath = req.params.dirPath.toString().replaceAll(",", "/");
  const { data, error } = await supabase.storage
    .from("files")
    .createSignedUrl(`${req.user}/${dirPath}`, 60); // Good for one minute.

  if (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
  return res.status(200).json({ url: data.signedUrl });
}

export { driveGet, fileGet };

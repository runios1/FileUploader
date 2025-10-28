import jsonwebtoken from "jsonwebtoken";

function issueJWT(user) {
  const expires = "1d";

  const payload = {
    sub: user.id,
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expires,
    algorithm: "HS256",
  });

  return {
    token: signedToken,
    expiresIn: expires,
  };
}

export default issueJWT;

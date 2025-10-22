import jsonwebtoken from "jsonwebtoken";

function issueJWT(user) {
  const expires = "1d";

  const payload = {
    sub: user.id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.RSA_PRIVATE_KEY, {
    expiresIn: expires,
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn: expires,
  };
}

export default issueJWT;

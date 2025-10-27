import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import prisma from "./prisma.mjs";

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: jwt_payload.sub,
          },
        });

        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.error("JWT Strategy Error:", err);
        return done(err, false);
      }
    }
  )
);

export default passport;

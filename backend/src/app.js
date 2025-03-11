import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "./models/userModel.js";
import { generateToken } from "./controllers/userControllers.js";
const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.79:5173", "*"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Configuration of google auth
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
import passport from "passport";
import OAuth2strategy from "passport-google-oauth2";
import session from "express-session";

// Setup session
app.use(
  session({
    secret: "12342ijdfji",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2strategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          });
          console.log(user);

          // await user.save();

          user = await User.findById(user._id).select("-password");
          console.log("After token", user);
        }
        const token = await generateToken(user._id);

        return done(null, { ...user.toObject(), token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Initialize passport
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initialize google auth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token;
    const options = {
      httpOnly: true,
      secure: true,
    };

    // Set the cookie

    console.log(token);

    res.cookie("token", token, options).redirect("http://localhost:5173");
  }
);

app.get("/login/success", async (req, res) => {
  // console.log("reqqq", req.user);

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (req.user) {
    res
      .status(200)
      .cookie("token", req.user.token, options)
      .json({ message: "user Login:", user: req.user });
  } else {
    res.status(400).json({ message: "Not authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173/");
  });
});

import userRouter from "./routes/userRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import negotiationRouter from "./routes/negotiationRoutes.js";
import otpRouter from "./routes/otpRoutes.js";
import experinceRouter from "./routes/experienceRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

// router declaration
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/negotiation", negotiationRouter);
app.use("/api/otp", otpRouter);
app.use("/api/experience", experinceRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/messages", messageRouter);
app.use("/api/admin", adminRouter);

export { app };

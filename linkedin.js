const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

passport.use(
  new LinkedInStrategy(
    {
      clientID: LINKEDIN_CLIENT_ID,
      clientSecret: LINKEDIN_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"], // Adjust scope as needed
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);

app.get("/auth/linkedin", passport.authenticate("linkedin"));

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  },
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.get("/profile", ensureAuthenticated, function (req, res) {
  res.render("profile", { user: req.user });
});
Client.post("jobs", linkedinJobData);

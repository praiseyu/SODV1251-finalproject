const router = require("express").Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const pathController = require("../controllers/controllers");

router.route('/login').get(pathController.getLoginPage)
    .post(pathController.postLoginReq);
router.route("/").get(pathController.getLandingPage);
router.route("/signup").get(pathController.getSignupPage).post(pathController.createNewAccount);
router.route("/flights").get(ensureAuthenticated, pathController.getFlightsPage).post(ensureAuthenticated, pathController.createFlightReservation);
router.route("/user").get(ensureAuthenticated, pathController.getUserInfo);
router.route("/thankyou").get(ensureAuthenticated, pathController.getThankyouPage);
router.route("/logout").post(pathController.logoutUser);

module.exports = router;
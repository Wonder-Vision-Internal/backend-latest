var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser').json();
var FrontController = require('./../controllers/FrontController');
var HomeStayController = require('./../controllers/HomeStayController')
var middleware = require('../middleware/Authentication').auth
const { login, signUp, verifyToken } = require('../controllers/AdminController');
const multer = require('multer')
const formdataParser = multer().fields([]);
const {RegistrationValidation,LoginValidation} = require('../middleware/validation')

router.use(formdataParser);



//Routes
router.post('/login',LoginValidation,login)
router.post('/sign-up',RegistrationValidation,signUp)
router.get('/home',jsonParser, FrontController.home);
router.get('/about',jsonParser, FrontController.about);
router.get('/get-founders',jsonParser, FrontController.getFounders);
router.get('/get-testimonial',jsonParser, FrontController.testimonial);
router.get('/get-all/:type',jsonParser, FrontController.homePackages); // type= home_stay or packages
router.get('/get-home-stay-details/:slug',jsonParser, FrontController.homeStayDetails);
router.get('/get-package-details/:slug',jsonParser, FrontController.packageDetails);
// router.get('/other-home-stay/:type',jsonParser, FrontController.otherHomeStay);
router.get('/otherhomestays/:slug',HomeStayController.otherHomeStay)
router.get('/otherpackages/:slug', HomeStayController.otherPackage)
router.get('/get-post-details-by-slug/:slug',jsonParser, FrontController.getPostDetailsBySlug);
router.get('/get-price-details/:slug',FrontController.getPriceDetails)
router.get('/get-all-blog-dates',jsonParser, FrontController.getAlldates);
router.get('/get-all-packages/:category',jsonParser, FrontController.packageShow);
router.get('/get-all-banners/:type/:id',jsonParser, FrontController.getBanners);
router.get('/get-export-form-banners',jsonParser, FrontController.getExportFormBanners);
router.get('/awards-accreditation',jsonParser, FrontController.awardsAccreditation);
router.get('/get-expertform-content/:id',jsonParser, FrontController.getExpertFormContent);
router.get('/get-meta-info',jsonParser, FrontController.getMetaInfo);
router.get('/send-query',jsonParser, FrontController.sendQuery);
//phone pay
router.get('/payment',jsonParser, FrontController.newPayment);
router.post('/payment/status/:txnId', jsonParser, FrontController.checkStatus);

router.get('/get-testimonials-crousel', FrontController.getCrouselTestimonial);

router.get('/best-things-to-do/:slug', FrontController.bestThingsToDo);
router.get('/best-places/:slug', FrontController.bestPlaces);
router.get('/package-youtube-url/tour-guidance/:slug', FrontController.getpackageTourGuidanceYoutubeUrl);

router.get('/package-youtube-url/our-happy-client/:slug', FrontController.getpackageOurHappyClientYoutubeUrl);






// router.use(middleware)

router.post('/verifytoken',verifyToken)
router.post('/get-my-bookings/:mail',FrontController.getMyBookings)
router.post('/update-user-profile',FrontController.updateUserProfile)

module.exports = router;

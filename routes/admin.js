var express = require('express');
var router = express.Router();
const multer = require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./public/img')
    },
    filename:function(req,file,cb){
        return cb(null,file.originalname)
    }
})


const maxSize = 25 * 1024 * 1024

const upload = multer({
    storage : storage,
    limits: {
        fieldSize:  maxSize
      }})



// var jsonParser = require('body-parser').json();
var middleware = require('../middleware/Authentication').auth
var AdminController = require('../controllers/AdminController');
var founderController = require('../controllers/FounderController')
var PackageController = require('../controllers/PackageController')
var storyController = require('../controllers/StoryController')
var HomeStayController=require('../controllers/HomeStayController')
var BannerController = require('../controllers/BannerController');
var galleryController = require('../controllers/GalleryController')
var blogController = require('../controllers/BlogController')
var gaqController = require('../controllers/GaqController')
var awardController = require('../controllers/AwardController');
var testimonialController = require('../controllers/TestimonialController')
var aboutController = require('../controllers/AboutController')
var homeController = require('../controllers/HomeController')
var tailormadeController = require('../controllers/TailormadeController')
var contactController = require('../controllers/CustomerInteraction')
var userController = require('../controllers/UserController')
var staffController = require('../controllers/StaffController')
var permissionController = require('../controllers/PermissionController')
var bookingController = require('../controllers/BookingController');
const frontController = require('../controllers/FrontController');
const bestThingsController = require('../controllers/BestThingsToDo');
const bestPlacesController = require('../controllers/BestPlaces');
const packageYoutubeUrlController = require('../controllers/PackageYoutubeUrlController.js');
const homeClientController = require('../controllers/HomeClient.js');


//Routes


router.post('/login',upload.single(),AdminController.login);


router.get('/getallpermissions',permissionController.getallpermissions)
router.post('/updatepermissions',upload.single(),permissionController.updatePermissions)

router.post('/getsidebarmodules',upload.single(),AdminController.getSidebarModules)
router.get('/getpermissionsbyid/:emp_id',staffController.getPermissionsById)

router.get('/getallstaffs',staffController.getAllStaffs)
router.get('/searchbyempid/:emp_id',staffController.searchByEmpId)
router.post('/addstaff',upload.single(),staffController.addStaff)
router.post('/updatestaff',upload.single(),staffController.updateStaff)

router.get('/getallmeta',homeController.getAllMeta)
router.post('/updatemeta',upload.single(),homeController.updateMeta)

router.get('/getallusers',userController.getAllUsers)

router.get('/getinteractions',contactController.getInteractions)

router.get('/getallbookings',bookingController.getAllBookings)
router.get('/searchbookings',bookingController.searchByBookings)
router.post('/addbooking',upload.single(),bookingController.addBooking)
router.get('/loadsinglebooking/:id',bookingController.loadSingleBooking)
router.post('/updatebooking',upload.single(),bookingController.updateBooking)
router.post('/cancelbooking/:id',bookingController.cancelBooking)


router.get('/getintroduction',homeController.getIntroduction)
router.post('/updateintroduction',upload.single(),homeController.updateIntroduction)
router.get('/special-tour-details',homeController.getSpecialTour)
router.post('/updatespecialtour',upload.single('pic'),homeController.updateSpecialTour)

router.get('/getvisionmission/:title',aboutController.getVisionMission)
router.post('/updatevisionmission',upload.single('pic'),aboutController.updateVisionMission)

router.get('/getfounderlist',founderController.getFounderList)
router.post('/addfounder',upload.single('pic'),founderController.addMember)
router.get('/getfounderbyid/:fid',founderController.getFounderById)
router.post('/updatefounder/:fid',upload.single('pic'),founderController.updateFounder)
router.get('/deletefounder/:fid',founderController.deleteFounder)

router.get('/get-tailormade',tailormadeController.getTailormade)
router.post('/addtailormade',upload.single('pic'),tailormadeController.addTailormade)
router.post('/updatetailormade',upload.single('f_img'),tailormadeController.updateTailormade)

router.get('/getallawards',awardController.getAllAwards)
router.post('/addawards',upload.single('pic'),awardController.addAward)
router.get('/deleteaward/:awardId',awardController.deleteAward)
router.post('/updateaward',upload.single('pic'),awardController.updateAward)

router.post('/addhomestay',upload.any(),HomeStayController.addHomeStay)
router.get('/getallhomestay',HomeStayController.getAllHomeStay)
router.get('/gethomestaybyslug/:slug',HomeStayController.getHomeStayBySlug)
router.post('/updatehomestay',upload.any(),HomeStayController.updateHomeStay)
router.post('/deletehomestay/:slug',HomeStayController.deleteHomeStay)
router.post('/hideunhidehomestay/:slug',HomeStayController.hideUnhideHomeStay)

router.get('/filterroombyslug/:slug',HomeStayController.filterRooms)
router.post('/addroom/:slug',upload.single('roompic'),HomeStayController.addRooms)
router.post('/deleteroom/:roomid',HomeStayController.deleteRoom)
router.post('/hideunhideroom',upload.single(),HomeStayController.hideUnhideRoom)//not checked
router.get('/getroombyid/:roomid',HomeStayController.getRoomById)
router.post('/updateroom/:roomid',upload.single('roompic'),HomeStayController.updateRoom)

router.get('/getbottombanner/:slug',HomeStayController.getBottomBanner)
router.post('/addbottombanner/:slug',upload.single('bannerPic'),HomeStayController.addBottomBanner)
router.post('/updatebottombanner/:bannerId',upload.single('bannerPic'),HomeStayController.updateBottomBanner)
router.get('/deletebottombanner/:bannerId',HomeStayController.deleteBottomBanner)

router.get('/homestaylogoratinglist/:slug',HomeStayController.HomeStayLogoRatingList)
router.post('/addhomepackagelogorating',upload.single('pic'),HomeStayController.addHomePakcageLogoRating)
router.post('/updatehomestaylogorating',upload.single('pic'),HomeStayController.updateLogoRating)
router.post('/deletelogorating/:id/:index',HomeStayController.deleteLogoRating)
router.get('/otherhomestays/:slug',HomeStayController.otherHomeStay)
router.post('/addotherhomestay',upload.single(),HomeStayController.addOtherHomeStay)
router.post('/deleteotherhomestay/:slug/:index',HomeStayController.deleteOtherHomeStay)
router.get('/otherpackages/:slug',HomeStayController.otherPackage)
router.post('/addotherpackage',upload.single(),HomeStayController.addOtherPackage)
router.get('/deleteotherpackage/:slug/:index',HomeStayController.deleteOtherPackage)

router.post('/markasotherhspackage',PackageController.markAsOtherHSPackage)

router.get('/getcategoryimages',PackageController.getCategoryImages)
router.post('/updatecategoryimage/:catImageId',upload.single('catPic'),PackageController.updateCategoryImage)
router.post('/addpackage',upload.any(),PackageController.addPackage)
router.post('/addpackagetab',upload.single(),PackageController.addPackageTab)
router.post('/addpricedetails',upload.single(),PackageController.addPriceDetails)
router.post('/deletepricedetails',upload.single(),PackageController.deletePriceDetails)
router.post('/updatepackage',upload.any(),PackageController.updatePackage)
router.get('/get-tab-names/:slug',PackageController.fetchTabNames)
router.post('/updatepackagetab',upload.single(),PackageController.updatePackageTab)
router.post('/deletepackagetab',upload.single(),PackageController.deletePackageTab)
router.get('/getallpackages',PackageController.getAllPackages)
router.get('/get-price-details/:slug',frontController.getPriceDetails)
router.get('/filterpackagebycategory/:package_category',PackageController.filterPackages)
router.get('/getpackagebyslug/:slug',PackageController.getPackageBySlug)
router.post('/hideunhidepackage/:slug',PackageController.hideUnhidePackage)
router.post('/deletepackage/:slug',PackageController.deletePackage)
router.get('/getpackagebottombanner/:slug',PackageController.getPackageBottomBanner)
router.post('/addpackagebottombanner/:slug',upload.single('bannerPic'),PackageController.addPackageBottomBanner)
router.post('/updatepackagebottombanner/:bannerId',upload.single('bannerPic'),PackageController.updatePackageBottomBanner)
router.get('/deletepackagebottombanner/:bannerId',PackageController.deletePackageBottomBanner)
router.get('/inclusionlist/:slug',PackageController.inclusionList)
router.post('/addinclusion',upload.single('pic'),PackageController.addInclusion)
router.get('/loadsingleinclusion/:inclusionId',PackageController.loadSingleInclusion)
router.post('/updateinclusion',upload.single('pic'),PackageController.updateInclusion)
router.get('/deleteinclusion/:inclusionId',PackageController.deleteInclusion)

router.get('/getgaqbypackage/:slug',gaqController.getGaqByPackage)
router.post('/addgaqtab',upload.single(),gaqController.addGaqTab)
router.post('/addgaq',upload.single(),gaqController.addGaq)
router.get('/loadsinglegaq/:gaqid/:tab_index/:title_index',gaqController.loadSingleGaq)
router.post('/updategaq',upload.single(),gaqController.updateGaq)
router.post('/deletepackagegaq/:gaqid/:tab_index/:title_index',gaqController.deletePackageGaq)
router.get('/getgaqbyhomestay/:slug',gaqController.getGaqByHomeStay)
router.post('/addhomestaygaq',upload.single(),gaqController.addHomestayGaq)
router.get('/loadsinglehomestaygaq/:gaqid/:index',gaqController.loadSingleHomeStayGaq)
router.post('/updatehomestaygaq',upload.single(),gaqController.updateHomestayGaq)
router.post('/deletehomestaygaq/:gaqid/:title',gaqController.deleteHomestayGaq)


router.get('/getbannerbypage/:page_name',BannerController.getBannerByPage)
router.get('/gethomestaybanner',BannerController.getHomeStayBanner)
router.get('/getblogsbanner',BannerController.getBlogsBanner)
router.post('/addmainbanner',upload.single('pic'),BannerController.addMainBanner)
router.post('/addsub-banner',upload.single('pic'),BannerController.addSubBanner)
router.get('/loadsinglebanner/:bannerid',BannerController.loadSingleBanner)
router.post('/updatebanner/:bannerid',upload.single('pic'),BannerController.updateBanner)
router.get('/deletebanner/:bannerid',BannerController.deleteBanner)

router.get('/filtergallerybyslug/:slug',galleryController.getGalleryBySlug)
router.post('/addhomestaypackagegallery/:slug',upload.single('pic'),galleryController.addHomeStayPackageGallery)
router.get('/loadsinglegallery/:galid',galleryController.loadSingleGallery)
router.post('/updategallery/:galid',upload.single('pic'),galleryController.updateGallery)
router.get('/deletegallerypicture/:galid',galleryController.deleteGalleryPicture)


router.get('/filterstorybyslug/:slug',storyController.filterStory)
router.post('/addstory',upload.single('pic'),storyController.addStory)
router.get('/loadsinglestory/:storyid',storyController.loadSingleStory)
router.post('/updatestory/:storyid',upload.single('pic'),storyController.updateStory)
router.get('/deletestory/:storyid',storyController.deleteStory)
router.get('/addpackagestories',storyController.addPackageStory)
router.get('/gettestimonialstories',storyController.getTestimonialStories)

router.get('/testimonial-list',testimonialController.getTestimonials)
router.post('/addtestimonial',upload.single(),testimonialController.addTestimonial)
router.post('/updatetestimonial',upload.single(),testimonialController.updateTestimonial)
router.get('/deletetestimonial/:testimonialId',testimonialController.deleteTestimonial)

router.post('/add-img',upload.single('file'),  testimonialController.addImg)


router.post('/add-testimonials-crousel', testimonialController.addTestimonialsCrousel)

router.get('/get-testimonials-crousel', testimonialController.getTestimonialsCrousel)

router.post('/update-testimonials-crousel/:id', testimonialController.updateTestimonialsCrousel)

router.delete('/delete-testimonials-crousel/:id', testimonialController.deleteTestimonialsCrousel)

router.post('/add-best-things-to-do', bestThingsController.addBestThingsToDo)

router.get('/get-best-things-to-do', bestThingsController.getBestThingsToDo)

router.post('/update-best-things-to-do/:id', bestThingsController.updateBestThingsToDo)

router.delete('/delete-best-things-to-do/:id', bestThingsController.deleteBestThingsToDo)

router.post('/add-best-places', bestPlacesController.addBestPlaces)

router.get('/get-best-places', bestPlacesController.getBestPlaces)

router.post('/update-best-places/:id', bestPlacesController.updateBestPlaces)

router.delete('/delete-best-places/:id', bestPlacesController.deleteBestPlaces)

router.post('/add-package-youtube-url', packageYoutubeUrlController.addPackageYoutube)

router.get('/get-package-youtube-url', packageYoutubeUrlController.getPackageYoutube)

router.post('/update-package-youtube-url/:id', packageYoutubeUrlController.updatePackageYoutube)

router.delete('/delete-package-youtube-url/:id', packageYoutubeUrlController.deletePackageYoutube)

router.get('/getallblogs',blogController.getAllBlogs)
router.post('/addblog',upload.single('f_img'),blogController.addBlog)
router.get('/loadsingleblog/:blogId',blogController.loadSingleBlog)
router.post('/updateblog',upload.single('f_img'),blogController.updateBlog)
router.get('/deleteblog/:blogId',blogController.deleteBlog)

router.post('/add-home-client-youtube-url', homeClientController.addHomeClientYoutubeUrl)

router.get('/get-home-client-youtube-url', homeClientController.getHomeClientYoutubeUrl)

router.post('/update-home-client-youtube-url/:id', homeClientController.updateHomeClientYoutubeUrl)

router.delete('/delete-home-client-youtube-url/:id', homeClientController.deleteHomeClientYoutubeUrl)



const formdataParser = multer().fields([]);
router.use(formdataParser)
// router.use(middleware)


router.post('/verifytoken',AdminController.verifyToken)

module.exports = router;

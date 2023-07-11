const { catchAsync, httpStatusCodes } = require('../helper/helper');
const vipClubModel = require('../model/schema/vipClubSchema');

const insertVipClub = catchAsync(async function (req, res, next) {
   const { userRole, reward, currency, amount, points, name, level } = req.body;

   if (userRole == 'Admin') {
      const existReward = await vipClubModel.findOne({ reward, amount, points, name }).lean();
      if (existReward?._id) {
         return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
            success: false,
            error: true,
            message: `reward with this details already exists`
         })
      }
      createVipClub = await vipClubModel.create({
         userRole,
         reward,
         currency,
         amount,
         points,
         name,
         level
      })
      res.status(httpStatusCodes.CREATED).json({
         success: true,
         error: false,
         message: `vip club created successfully`,
         data: createVipClub
      })
   }
   return res.status(httpStatusCodes.NOT_ACCEPTABLE).json({
      success: false,
      error: true,
      message: `User role is not admin`
   })
   
})

const findAllVipClub = catchAsync(async function (req, res, next) {
   const { userid, reward, currency, amount, points, name, level } = req.query;
   // const findLevel = await vipClubModel.find({ level: { $eq: level } })
   const page = +req.params.page || 1;
   const perPage = +req.params.perPage || 2;
   const skip = (page - 1) * perPage;
   const countData = await vipClubModel.find({ amount }).countDocuments();
   const totalPage = Math.ceil(countData / perPage);

   const findAllVipClub = await vipClubModel.find({}).populate("currency level", "currencyName level")
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 })
      .exec();

   if (findAllVipClub) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         vipList: { findAllVipClub, currentPage: page, perPage: perPage, totalPage }
      });
   }
   return res.status(httpStatusCodes.NOT_FOUND).json({
      success: false,
      error: true,
      message: 'Not found',
   });
})

// const findOneVipClub = catchAsync(async function (req, res, next) {
//    const findAllVipClub = await vipClubModel.findOne({});

//    if (findAllVipClub) {
//       return res.status(httpStatusCodes.OK).json({
//          success: true,
//          error: false,
//          avatars: findAllVipClub,
//       });
//    }
// })

const updateVipClub = catchAsync(async function (req, res, next) {
   const id = req.params.id;
   const { reward, currency, amount, points, name, level } = req.body;
   const findAllVipClub = await vipClubModel.findOne({ id });
   if (findAllVipClub) {
      const updateVipClub = await vipClubModel.updateOne({
         amount: amount,
      })
      return res.status(httpStatusCodes.OK).json({
         success: true,
         error: false,
         data: { updateVipClub }
      });
   }
})

module.exports = {
   insertVipClub,
   findAllVipClub,
   updateVipClub,
};
/* tslint:disable */

var express = require('express');
var regionCtrl = require('../controllers/region.controller');
var router = express.Router();

module.exports = router;

router.get('/', regionCtrl.getAllRegions);
router.get('/:regionId/zions', regionCtrl.getRegionZions);
router.get('/:regionId/zions/:zionId/groups', regionCtrl.getRegionGroups);
router.get('/:regionId/zions/:zionId/activities/:month', regionCtrl.getRegionActivities);

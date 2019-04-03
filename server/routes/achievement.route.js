/* tslint:disable */

var express = require('express');
var achievementCtrl = require('../controllers/achievement.controller');
var router = express.Router();

module.exports = router;

router.get('/zions/all', achievementCtrl.getAllZionAchievements);
router.get('/zions/:zionId', achievementCtrl.getZionAchievements);
router.get('/:username', achievementCtrl.getAchievement);
router.post('/:username', achievementCtrl.addNewAchievement);
router.put('/:username', achievementCtrl.updateAchievement);
router.put('/:username/fruits', achievementCtrl.addNewFruit);
router.delete('/:username', achievementCtrl.removeMemberAchievement);

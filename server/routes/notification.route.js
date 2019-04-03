/* tslint:disable */

var express = require('express');
var notificationCtrl = require('../controllers/notification.controller');
var router = express.Router();

module.exports = router;

router.get('/groups', notificationCtrl.getNotificationGroupList);
router.get('/users/:username', notificationCtrl.getNotificationByUsername);
router.get('/users/:username/unread', notificationCtrl.getUnreadNotificationByUsername);
router.get('/:notificationId', notificationCtrl.getNotificationById);
router.post('/', notificationCtrl.addNotification);
router.post('/groups', notificationCtrl.addNotificationGroup);
router.put('/groups', notificationCtrl.updateNotificationGroup);
router.put('/:notificationId', notificationCtrl.updateNotificationById);
router.delete('/groups/:notificationGroupId', notificationCtrl.deleteNotificationGroupById);
router.delete('/:notificationId', notificationCtrl.deleteNotificationById);

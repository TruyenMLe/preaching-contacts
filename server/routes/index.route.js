/* tslint:disable */

const express = require('express');
const achievementRoutes = require('./achievement.route');
const attendanceRoutes = require('./attendance.route');
const authenticationRoutes = require('./authentication.route');
const contactRoutes = require('./contact.route');
const elohimAcademyRoutes = require('./elohim-academy.route');
const groupRoutes = require('./group.route');
const notificationRoutes = require('./notification.route');
const regionRoutes = require('./region.route');
const scheduleRoutes = require('./schedule.route');
const userRoutes = require('./user.route');
const zionRoutes = require('./zion.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/achievement', achievementRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/authentication', authenticationRoutes);
router.use('/contacts', contactRoutes);
router.use('/elohim-academy', elohimAcademyRoutes);
router.use('/groups', groupRoutes);
router.use('/notifications', notificationRoutes);
router.use('/regions', regionRoutes);
router.use('/regions', regionRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/users', userRoutes);
router.use('/zion', zionRoutes);

module.exports = router;

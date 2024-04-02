let routers = {};
const express = require('express');
const loadRoutes = express();

routers.cartRoutes = require('./cartRoutes');
routers.productRoutes = require('./productRoutes');
routers.userRoutes = require('./userRoutes');

loadRoutes.use('/api', routers.userRoutes);
loadRoutes.use('/api', routers.productRoutes);
loadRoutes.use('/api', routers.cartRoutes);

module.exports = loadRoutes;
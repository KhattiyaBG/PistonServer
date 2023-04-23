require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const todoListRoutes = require('./routes/todoList');
const inventoryRoutes = require('./routes/inventory');
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/user');
const db = require('./models');
const PORT = process.env.PORT;





require('./config/passport/passport');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/test', todoListRoutes);  
app.use('/inventory', inventoryRoutes);
app.use('/item', itemRoutes);
app.use('/users', userRoutes);
app.use('/image', express.static('./image'));

db.sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
});
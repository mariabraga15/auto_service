//importuri
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');
const { sequelize } = require('./models/index');
//middleware-uri
const requestLogger = require('./middleware/requestLogger')
const errorHandler = require('./middleware/errorHandler')
const notFoundHandler = require('./middleware/notFoundHandler')
const rateLimiter = require('./middleware/rateLimit')
dotenv.config();
const PORT = process.env.PORT || 5000
const app = express();

app.use(compression());
app.use(express.json())
app.use(cors());
app.use(requestLogger);
app.use(errorHandler);
app.use(rateLimiter);
app.use(helmet());

//rutele
const clientRoutes = require('./routers/userRoutes')
const masiniRoutes = require('./routers/masinaRoutes')
const programareRoutes = require('./routers/programareRoutes')
const istoricRoutes = require('./routers/istoricRoutes')
const pieseRoutes = require('./routers/piesaRoutes');
const authRoutes = require('./routers/authRoutes')
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/masini', masiniRoutes);
app.use('/api/programari', programareRoutes);
app.use('/api/istoric', istoricRoutes);
app.use('/api/piese', pieseRoutes);
app.use(notFoundHandler);

//sync baza de date
sequelize.sync({  }).then(() => {
    console.log('Tabele sincronizate');
    app.listen(PORT, () => {
       console.log('Serverul ruleaza pe http://localhost:8080')
    });
  });
  
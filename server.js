const express = require('express') ;
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/login/admin' , require('./routes/api/login/admin'));
app.use('/api/login/interv' , require('./routes/api/login/intervenant'));

//Produit
app.use('/api/insert/stock' , require('./routes/api/insert/stock'));
app.use('/api/insert/aug_stock' , require('./routes/api/insert/aug_stock'));
app.use('/api/select/stock' , require('./routes/api/select/stock'));
app.use('/api/select/chartnbstock' , require('./routes/api/select/nbstock'));
app.use('/api/select/stockfirst' , require('./routes/api/select/stockfirst'));
app.use('/api/delete/stock' , require('./routes/api/delete/stock'));
//Equipement
app.use('/api/insert/equipement' , require('./routes/api/insert/equipement'));
//
app.use('/api/select/type_equip' , require('./routes/api/select/type_equip'));
//
app.use('/api/select/equipement' , require('./routes/api/select/equipement'));
app.use('/api/delete/equipement' , require('./routes/api/delete/equipement'));
//
app.use('/api/select/intervenant' , require('./routes/api/select/intervenant'));
app.use('/api/insert/intervenant' , require('./routes/api/insert/intervenant'));
app.use('/api/delete/intervenant' , require('./routes/api/delete/intervenant'));

//
app.use('/api/insert/type_equip' , require('./routes/api/insert/type_equip'));
app.use('/api/delete/type_equip' , require('./routes/api/delete/type_equip'));
//
app.use('/api/insert/interv_prev' , require('./routes/api/insert/interv_prev'));
app.use('/api/select/intervention_prev' , require('./routes/api/select/intervention_prev'));
app.use('/api/insert/interv_cor' , require('./routes/api/insert/interv_cor'));
app.use('/api/select/intervention_cor' , require('./routes/api/select/intervention_cor'));
app.use('/api/delete/intervention' , require('./routes/api/delete/intervention'));

//
app.use('/api/select/intervention_intervenant' , require('./routes/api/select/intervention_intervenant'));
app.use('/api/select/intervention_stock' , require('./routes/api/select/intervention_stock'));
//

//







const PORT = process.env.PORT || 5000 ;

app.listen(PORT , () => console.log(`Server started on port ${PORT}`));

import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    //local
    //connect(process.env.MONGO_URI = 'mongodb://localhost:27017/foodmine', {
    //nube
    //connect(process.env.MONGO_URI = 'mongodb://mongo:sIFfvNvWAdtGmQZwkhBfarMcoJwALYJh@viaduct.proxy.rlwy.net:36740', {
    connect(process.env.MONGO_URI = 'mongodb+srv://foodie:EstoEsUnaPrueba2024@foods.2yyxz7y.mongodb.net/?retryWrites=true&w=majority&appName=foods', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("Conectado a la BD con éxito!"),
        (error) => console.log(error)
    )
}
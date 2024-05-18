import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    //connect(process.env.MONGO_URI = 'mongodb://localhost:27017/foodmine', {
    connect(process.env.MONGO_URI = 'mongodb://mongo:sIFfvNvWAdtGmQZwkhBfarMcoJwALYJh@viaduct.proxy.rlwy.net:36740', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}
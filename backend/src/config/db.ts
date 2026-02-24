import mongoose from 'mongoose';

const connectDB = async():Promise<void>=>{
    try {
        const mongoURL = process.env.MONGO_URL;

        if(!mongoURL){
            throw new Error('mongo url is not in env file');
        }
        const conn = await mongoose.connect(mongoURL);

        console.log('Database connected',conn.connection.name);
    } catch (error) {
        console.log('database connection error',error);
    }
}


export default connectDB;
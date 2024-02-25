'use server'

import mongoose from "mongoose"

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(!process.env.MONGODB_URI) return console.log('MONGODB URI is not defined')

    if(process.env.MONGODB_URI) return console.log('=> using existing database connection')

    try {
        await mongoose.connect(process.env.MONGODB_URI)

        isConnected = true

        if(isConnected) console.log('MongoDB connected')
    } catch (error) {
        console.error(`Connect to database ${error}`)
    }
}
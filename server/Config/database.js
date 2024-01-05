import mongoose from "mongoose"

export const ConnectDataBase = () => {
    mongoose.connect(process.env.DB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((data) => {
      console.log(`Mongodb Connected : ${data.connection.host}`)
   }).catch((err) => {
      console.error(err)
      process.exit(1)
   })
}
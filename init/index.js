const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGOOSE_URL="mongodb://127.0.0.1:27017/HotailBNB";

async function main() {
    await mongoose.connect(MONGOOSE_URL);
}
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner :"66ec333c539bcc82ae65b8da"}));
    await Listing.insertMany(initData.data);
    console.log("data Inserted");
}
initDB();
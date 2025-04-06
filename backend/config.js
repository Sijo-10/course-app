import dotenv from "dotenv"
dotenv.config();

const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD=process.env.JWT_ADMIN_PASSWORD
const STRIPE_SECRET_KEY="sk_test_51R98D2SEUL0Byeov9zU0geUqme89UaTGqcwJ7WehSdRqytMuDkQldsk2ENaXCKELKO4MViKRSZ5dw9rvIsd3LuEf00fZCk5XSp"


export default {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    STRIPE_SECRET_KEY
};
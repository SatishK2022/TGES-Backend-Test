import connectToDb from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { sendMail } from "../utils/sendMail.js";
import { comparePassword, generateToken, hashPassword, isValuePresent } from "../utils/helper.js";

let db = await connectToDb();

/**
 * @retailRegister
 * @params req, res
 * @Description : This function is used to create retail user data in the 'retail_user' table of the 'tges' database using the MySQL module
*/
const retailRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { firstName, secondName, lastName, email, residentialAddress, zipCode, country, city, state, phoneNumber1, phoneNumber2, stateCode, countryCode, username, password, gender, occupation, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website } = reqBody;

    if (!isValuePresent(reqBody)) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        // Check for duplicate email or username
        const checkEmailSql = `SELECT * FROM user WHERE email = ? `;
        const emailParams = [email];
        const [existingUserResult, existingUserFields] = await db.query(checkEmailSql, emailParams);

        console.log(existingUserResult);

        if (existingUserResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email or username"
                )
            );
        }

        const insertUserSql = `INSERT INTO user (email, zipCode, country, state, city, password) VALUES ( ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, state, city, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertRetailUserSql = `INSERT INTO retail_user (userId, firstName, secondName, lastName, username, gender, phoneNumber1, phoneNumber2, stateCode, countryCode, occupation, residentialAddress, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const retailParams = [userId, firstName, secondName, lastName, username, gender, phoneNumber1, phoneNumber2, stateCode, countryCode, occupation, residentialAddress, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website];
        await db.query(insertRetailUserSql, retailParams);

        // Send Mail
        // await sendMail(
        //     email,
        //     "Welcome to TGES",
        //     `<h1>Hi ${firstName} ${lastName}, Welcome to TGES.</h1>`
        // )

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Retail User Created Successfully"
            )
        );
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    }
});

/**
 * @corporateRegister
 * @params req, res
 * @Description : This function is used to create corporate user data in the 'corporate_user' table of the 'tges' database using the MySQL module
*/
const corporateRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartment, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, email, password, zipCode, country, city, state } = reqBody;

    let contactDepartmentTitle = (contactDepartment?.title === 'Other') ? contactDepartment?.otherTitle : contactDepartment?.title;

    try {
        // Check for duplicate email
        const checkEmailSql = `SELECT * FROM user WHERE email = ?`;
        const emailParams = [email];
        const [emailResult, emailFields] = await db.query(checkEmailSql, emailParams);

        if (emailResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email"
                )
            );
        }

        const insertUserSql = `INSERT INTO user (email, zipCode, country, city, state, password) VALUES ( ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, city, state, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertCorprate = `INSERT INTO corporate_user (userId, industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartment, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const corprateParams = [userId, industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartmentTitle, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website];
        await db.query(insertCorprate, corprateParams);

        // Send Mail
        // await sendMail(
        //     email,
        //     "Welcome to TGES",
        //     `<h1>Hi ${firstName} ${lastName}, Welcome to TGES.</h1>`
        // )

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Corporate User Created Successfully"
            )
        );
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    }
});

/**
 * @vendorRegister
 * @params req, res
 * @Description : This function is used to create vendor user data in the 'vendor' table of the 'tges' database using the MySQL module
*/
const vendorRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { areaOfWork, companyName, zipCode, country, city, state, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, landlineCityCode, landlineCountryCode, contactPersonGender, phoneNumber, landlineNumber, countryCode, stateCode, email, password, website, address1, address2, address3, address4 } = reqBody;

    if (!isValuePresent(reqBody)) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        // Check for duplicate email or username
        const checkEmailSql = `SELECT * FROM user WHERE email = ?`;
        const emailParams = [email];
        const [emailResult, emailFields] = await db.query(checkEmailSql, emailParams);

        if (emailResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email or username"
                )
            );
        }

        const insertUserSql = `INSERT INTO user (email, zipCode, country, city, state, password) VALUES ( ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, city, state, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertVendorSql = `INSERT INTO vendor (userId, areaOfWork, companyName, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode,contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, address1, address2, address3, address4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const vendorParams = [userId, areaOfWork, companyName, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, address1, address2, address3, address4];
        await db.query(insertVendorSql, vendorParams);

        // Send Mail
        // await sendMail(
        //     email,
        //     "Welcome to TGES",
        //     `<h1>Hi ${firstName} ${lastName}, Welcome to TGES.</h1>`
        // )

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Vendor Created Successfully"
            )
        );
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    }
})

/**
 * @retailLogin
 * @params req, res
 * @Description : This function is used to login retail user data in the 'user' table of the 'tges' database using the MySQL module
*/
const retailLogin = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email, password } = reqBody;

    if (!email || !password) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    const sql = `SELECT user.*, retail_user.* FROM user INNER JOIN retail_user ON user.id = retail_user.userId WHERE user.email = ?`;
    const params = [email];
    const [result, fields] = await db.query(sql, params);
    if (result.length === 0) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "User not found"
            )
        );
    }

    const user = result[0];

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Invalid credentials"
            )
        );
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    const cleanedResult = {
        ...user,
        otp: undefined,
        otpExpires: undefined,
        password: undefined,
        userId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
    };

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json(
            new ApiResponse(
                200,
                cleanedResult,
                "Login Successful"
            )
        );
})

/**
 * @corporateLogin
 * @params req, res
 * @Description : This function is used to login corporate user data in the 'user' table of the 'tges' database using the MySQL module
*/
const corporateLogin = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email, password } = reqBody;

    if (!email || !password) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    const sql = `SELECT user.*, corporate_user.* FROM user INNER JOIN corporate_user ON user.id = corporate_user.userId WHERE user.email = ?`;
    const params = [email];
    const [result, fields] = await db.query(sql, params);
    if (result.length === 0) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "User not found"
            )
        );
    }

    const user = result[0];

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Invalid credentials"
            )
        );
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    const cleanedResult = {
        ...user,
        otp: undefined,
        otpExpires: undefined,
        password: undefined,
        userId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
    };

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json(
            new ApiResponse(
                200,
                cleanedResult,
                "Login Successful"
            )
        );
})

/**
 * @vendorLogin
 * @params req, res
 * @Description : This function is used to login vendor user data in the 'user' table of the 'tges' database using the MySQL module
*/
const vendorLogin = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email, password } = reqBody;

    if (!email || !password) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    const sql = `SELECT user.*, vendor.* FROM user INNER JOIN vendor ON user.id = vendor.userId WHERE user.email = ?`;
    const params = [email];
    const [result, fields] = await db.query(sql, params);
    if (result.length === 0) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "User not found"
            )
        );
    }

    const user = result[0];

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Invalid credentials"
            )
        );
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    const cleanedResult = {
        ...user,
        otp: undefined,
        otpExpires: undefined,
        password: undefined,
        userId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
    };

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json(
            new ApiResponse(
                200,
                cleanedResult,
                "Login Successful"
            )
        );
})

/**
 * @forgotPassword
 * @params req, res
 * @Description : This function is used to send a forgot password email to the user.
 */
const forgotPassword = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email } = reqBody;

    if (!email) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "Email is required"
            )
        );
    }

    try {
        const sql = `SELECT * FROM user WHERE email = ?`;
        const params = [email];
        const [result, fields] = await db.query(sql, params);

        const user = result[0];

        if (!user) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6 digits OTP
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

        await db.query('UPDATE user SET otp = ?, otpExpires = ? WHERE email = ?', [otp, otpExpires, email]);

        // Send OTP via email
        await sendMail(
            email,
            "Forgot Password OTP",
            `<h1>Hi, </br>Here is your OTP: ${otp}</h1>`
        )

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "OTP sent to your email"
            )
        );
    } catch (error) {
        console.log("Error while forgot password: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while forgot password"
            )
        );
    }
})

/**
 * @verifyOtp
 * @params req, res
 * @Description : This function is used to verify the OTP sent to the user's email.
 */
const verifyOtp = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email, otp } = reqBody;

    if (!email || !otp) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const sql = `SELECT * FROM user WHERE email = ?`;
        const params = [email];
        const [result, fields] = await db.query(sql, params);

        const user = result[0];

        if (!user) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        if (user.otp !== otp) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "Invalid OTP"
                )
            );
        }

        if (user.otpExpires < Date.now()) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "OTP expired"
                )
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "OTP verified"
            )
        );
    } catch (error) {
        console.log("Error while verifying OTP: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while verifying OTP"
            )
        );
    }
})

/**
 * @resetPassword
 * @params req, res
 * @Description : This function is used to reset the user's password.
 */
const resetPassword = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email, password } = reqBody;

    if (!email || !password) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const sql = `SELECT * FROM user WHERE email = ?`;
        const params = [email];
        const [result, fields] = await db.query(sql, params);

        const user = result[0];

        if (!user) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        const hashedPassword = await hashPassword(password);

        await db.query('UPDATE user SET password = ? WHERE email = ?', [hashedPassword, email]);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Password reset successful"
            )
        );
    } catch (error) {
        console.log("Error while resetting password: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while resetting password"
            )
        );
    }
})

/**
 * @logout
 * @params req, res
 * @Description : This function is used to logout user by removing the token cookie from the browser.
 */
const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("token")
        .json(
            new ApiResponse(
                200,
                null,
                "Logout Successful"
            )
        );
})

export {
    corporateRegister,
    retailRegister,
    vendorRegister,
    retailLogin,
    corporateLogin,
    vendorLogin,
    forgotPassword,
    verifyOtp,
    resetPassword,
    logout
}
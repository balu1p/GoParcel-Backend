const validator = require("validator");

const validateSignup = (req) => {
  const { name, email, password, role, address, phoneNo, profileImg } =
    req.body;

  if (!name || !role || !password || !email || !phoneNo) {
    throw new Error("All fields are mandatory.");
  }

  if (name.length < 2 || name.length > 50) {
    throw new Error("First name must be between 2 and 50 characters.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format.");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols."
    );
  }

  if (phoneNo) {
    const strPhoneNo = phoneNo.toString();
    if (!validator.isMobilePhone(strPhoneNo, "any")) {
      throw new Error("Invalid phone number.");
    }
  }

  if (profileImg && !validator.isURL(profileImg)) {
    throw new Error("Profile image must be a valid URL.");
  }
};

const validationProduct = (req, isUpdate = false) => {
  const { productName, productHeight, productWidth, productWeight } = req.body;

  // For create: All fields are required
  if (!isUpdate) {
    if (!productName || !productHeight || !productWidth || !productWeight) {
      throw new Error("All fields are mandatory.");
    }
  }

  // Validate height, width, and weight (applies for both create and update)
  if (productHeight && productHeight > 20) {
    throw new Error("Product height must be equal to or less than 20 cm.");
  }

  if (productWidth && productWidth > 20) {
    throw new Error("Product width must be equal to or less than 20 cm.");
  }

  if (productWeight && productWeight > 20) {
    throw new Error("Product weight must be equal to or less than 20 kg.");
  }
};

module.exports = {
  validateSignup,
  validationProduct,
};

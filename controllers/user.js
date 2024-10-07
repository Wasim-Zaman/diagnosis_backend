const Joi = require('joi');

const User = require('../models/user');
const CustomError = require('../utils/error');
const response = require('../utils/response');
const JWT = require('../utils/jwt');
const Bcrypt = require('../utils/bcrypt');

// Joi validation schemas
const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(18).required(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
  image: Joi.string().optional(),
  termsAccepted: Joi.boolean().valid(true).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  fullName: Joi.string(),
  mobileNumber: Joi.string().pattern(/^[0-9]{10}$/),
  email: Joi.string().email(),
  age: Joi.number().integer().min(18),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER'),
  image: Joi.string(),
}).min(1);

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { fullName, mobileNumber, email, password, age, gender, image } = value;

    // Check if user already exists
    const existingUser = await User.findUnique({ where: { email } });
    if (existingUser) {
      throw new CustomError('Email is already registered', 400);
    }

    // Hash the password
    const hashedPassword = await Bcrypt.createPassword(password);

    // Create the new user
    const newUser = await User.create({
      data: {
        fullName,
        mobileNumber,
        email,
        password: hashedPassword,
        age,
        gender,
        image,
        termsAccepted: true,
      },
    });

    // Create a JWT token for the newly registered user
    const token = JWT.createToken(newUser);

    res.status(201).json(
      response(201, true, 'User registered successfully', {
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
        },
        token,
      })
    );
  } catch (error) {
    console.log(`Error in register: ${error.message}`);
    next(error);
  }
};

// Login a user
exports.login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { email, password } = value;

    // Find user by email
    const user = await User.findUnique({ where: { email } });
    if (!user) {
      throw new CustomError('No user found with the entered email', 401);
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await Bcrypt.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError('Invalid password entered', 401);
    }

    // Create a JWT token for the authenticated user
    const token = JWT.createToken(user);

    res.status(200).json(
      response(200, true, 'Login successful', {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
        token,
      })
    );
  } catch (error) {
    console.log(`Error in login: ${error.message}`);
    next(error);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json(response(200, true, 'User found successfully', user));
  } catch (error) {
    console.log(`Error in getUserById: ${error.message}`);
    next(error);
  }
};

// Get User
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.status(200).json(response(200, true, 'User found successfully', user));
  } catch (error) {
    console.log(`Error in getUserById: ${error.message}`);
    next(error);
  }
};

// Update a user by ID
exports.updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const updatedUser = await User.update({
      where: { id: parseInt(id) },
      data: value,
    });

    res.status(200).json(response(200, true, 'User updated successfully', updatedUser));
  } catch (error) {
    console.log(`Error in updateUserById: ${error.message}`);
    next(error);
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the user exists before deleting it
    const user = await User.findById(id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Delete the user from the database
    // Note: This will also delete any related documents (e.g., panchayats) in other collections
    await User.deleteById(id);

    res.status(200).json(response(200, true, 'User deleted successfully'));
  } catch (error) {
    console.log(`Error in deleteUserById: ${error.message}`);
    next(error);
  }
};

// Get all users with pagination
exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = '' } = req.query;

    const users = await User.get(Number(page), Number(limit), query);

    if (!users.data.length) {
      throw new CustomError('No users found', 404);
    }

    res.status(200).json(response(200, true, 'Users retrieved successfully', users));
  } catch (error) {
    console.log(`Error in getUsers: ${error.message}`);
    next(error);
  }
};

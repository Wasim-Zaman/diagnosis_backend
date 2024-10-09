const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

const CustomError = require('../utils/error');
const response = require('../utils/response');

// Joi validation schema
const packageSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().min(0).max(100).optional(),
  image: Joi.string().optional(),
  includes: Joi.array().items(Joi.string()).required(),
  services: Joi.array().items(Joi.string()).required(),
});

// Create a new package
exports.createPackage = async (req, res, next) => {
  try {
    const { error, value } = packageSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { services, ...packageData } = value;
    packageData.includes = JSON.stringify(packageData.includes);

    if (req.file) {
      packageData.image = req.file.path;
    }

    const newPackage = await prisma.package.create({
      data: {
        ...packageData,
        services: {
          connect: services.map((id) => ({ id })),
        },
      },
      include: { services: true },
    });

    res.status(201).json(response(201, true, 'Package created successfully', newPackage));
  } catch (error) {
    console.log(`Error in createPackage: ${error.message}`);
    next(error);
  }
};

// Get all packages with pagination
exports.getPackages = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = '' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const packages = await prisma.package.findMany({
      where: {
        OR: [{ name: { contains: query } }, { description: { contains: query } }],
      },
      skip,
      take: Number(limit),
      include: { services: true },
    });

    const totalPackages = await prisma.package.count({
      where: {
        OR: [{ name: { contains: query } }, { description: { contains: query } }],
      },
    });

    if (!packages.length) {
      throw new CustomError('No packages found', 404);
    }

    res.status(200).json(
      response(200, true, 'Packages retrieved successfully', {
        data: packages,
        totalPages: Math.ceil(totalPackages / Number(limit)),
        currentPage: Number(page),
        totalPackages,
      })
    );
  } catch (error) {
    console.log(`Error in getPackages: ${error.message}`);
    next(error);
  }
};

// Get package by ID
exports.getPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const package = await prisma.package.findUnique({
      where: { id },
      include: { services: true },
    });

    if (!package) {
      throw new CustomError('Package not found', 404);
    }

    res.status(200).json(response(200, true, 'Package found successfully', package));
  } catch (error) {
    console.log(`Error in getPackageById: ${error.message}`);
    next(error);
  }
};

// Update package by ID
exports.updatePackageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = packageSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { services, ...packageData } = value;
    packageData.includes = JSON.stringify(packageData.includes);

    if (req.file) {
      packageData.image = req.file.path;
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        ...packageData,
        services: {
          set: services.map((id) => ({ id })),
        },
      },
      include: { services: true },
    });

    res.status(200).json(response(200, true, 'Package updated successfully', updatedPackage));
  } catch (error) {
    console.log(`Error in updatePackageById: ${error.message}`);
    next(error);
  }
};

// Delete package by ID
exports.deletePackageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.package.delete({ where: { id } });
    res.status(200).json(response(200, true, 'Package deleted successfully'));
  } catch (error) {
    console.log(`Error in deletePackageById: ${error.message}`);
    next(error);
  }
};


const { z } = require("zod");
const Enquiry = require("../models/Enquiry");

const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  mobile: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{10,20}$/, "Invalid mobile number"),
  service: z.enum([
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Digital Marketing",
    "Custom Software",
  ]),
  budget: z.enum([
    "Under ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹5,00,000",
    "Above ₹5,00,000",
  ]),
  description: z.string().trim().min(10).max(2000),
}).strict();

const createEnquiry = async (req, res, next) => {
  try {
    const validation = enquirySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Please correct the submitted information.",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const existingEnquiry = await Enquiry.findOne({
      fullName: validation.data.fullName.trim(),
      email: validation.data.email.trim().toLowerCase(),
      service: validation.data.service,
    });

    if (existingEnquiry) {
      return res.status(409).json({
        success: false,
        message:
          "An enquiry with the same name, email, and service already exists.",
      });
    }

    const enquiry = await Enquiry.create(validation.data);

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      data: {
        id: enquiry._id,
        fullName: enquiry.fullName,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getEnquiries = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 10)
    );
    const search = String(req.query.search || "").trim();

    const filter = search
      ? {
        $or: [
          { fullName: { $regex: escapeRegex(search), $options: "i" } },
          { email: { $regex: escapeRegex(search), $options: "i" } },
          { service: { $regex: escapeRegex(search), $options: "i" } },
        ],
      }
      : {};

    const [items, total] = await Promise.all([
      Enquiry.find(filter)
        .select("-__v")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = { createEnquiry, getEnquiries };
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { nameRegex } from "@/lib/helpers";

// Define the form schema
const registrationSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .matches(nameRegex, "Invalid name format"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
    phone: yup.string().required("Phone number is required"),
    team: yup.string(),
    goals: yup.string(),
    agreeToTerms: yup
        .boolean()
        .oneOf([true], "You must agree to the terms and conditions"),
});

type RegistrationFormValues = yup.InferType<typeof registrationSchema>;

export default function RegisterPage() {
    const { id: eventId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    // Initialize React Hook Form
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        trigger,
    } = useForm<RegistrationFormValues>({
        resolver: yupResolver(registrationSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            team: "",
            goals: "",
            agreeToTerms: false,
        },
        mode: "onChange",
    });

    const watchedFields = watch();

    const nextStep = async () => {
        let fieldsToValidate: (
            | "name"
            | "email"
            | "phone"
            | "team"
            | "goals"
            | "agreeToTerms"
        )[] = [];

        if (currentStep === 1) {
            fieldsToValidate = ["name"];
        } else if (currentStep === 2) {
            fieldsToValidate = ["email", "phone"];
        }

        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data: RegistrationFormValues) => {
        setIsSubmitting(true);

        try {
            // Here you would normally send the data to your API
            console.log("Registration data:", data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setSubmitSuccess(true);
        } catch (error) {
            console.error("Registration error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f8f8f5] to-white"
            >
                <div className="w-full max-w-2xl">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden relative"
                    >
                        {/* Confetti animation effect */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{
                                        top: "-10%",
                                        left: `${Math.random() * 100}%`,
                                        opacity: 1,
                                        scale: 0,
                                    }}
                                    animate={{
                                        top: "100%",
                                        opacity: 0,
                                        scale: 1,
                                        rotate: Math.random() * 360,
                                    }}
                                    transition={{
                                        duration: 2.5 + Math.random() * 3,
                                        delay: Math.random() * 0.5,
                                        repeat: Infinity,
                                        repeatDelay: Math.random() * 2,
                                    }}
                                    className={`absolute h-3 w-3 rounded-full bg-${
                                        [
                                            "blue",
                                            "green",
                                            "yellow",
                                            "red",
                                            "purple",
                                            "pink",
                                        ][Math.floor(Math.random() * 6)]
                                    }-${Math.floor(Math.random() * 3 + 3)}00`}
                                />
                            ))}
                        </div>

                        <div className="gradient-bg p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>

                            <h1 className="text-3xl font-bold relative z-10">
                                You&apos;re All Set!
                            </h1>
                            <p className="opacity-90 relative z-10 mt-2">
                                Your registration has been confirmed
                            </p>
                        </div>

                        <div className="p-8 text-center">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.3,
                                }}
                                className="w-24 h-24 bg-gradient-to-r from-[#223030] to-[#2d4040] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                            >
                                <i className="fas fa-check text-[#DFEBF6] text-4xl"></i>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-2xl font-bold text-[#2D3436] mb-3"
                            >
                                Registration Successful!
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <p className="text-gray-600 mb-8">
                                    Thank you for registering for this event.
                                    We&apos;ve sent a confirmation email with
                                    all the details. We&apos;re excited to see
                                    you there!
                                </p>

                                <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
                                    <h3 className="font-medium text-gray-700 mb-3">
                                        What&apos;s Next?
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <i className="fas fa-envelope text-[#2d4040] mt-1 mr-3"></i>
                                            <span className="text-gray-600">
                                                Check your email for
                                                confirmation details
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-calendar-alt text-[#2d4040] mt-1 mr-3"></i>
                                            <span className="text-gray-600">
                                                Add this event to your calendar
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <i className="fas fa-share-alt text-[#2d4040] mt-1 mr-3"></i>
                                            <span className="text-gray-600">
                                                Share with friends and
                                                colleagues
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href={`/events/${eventId}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-lg 
                                                    font-medium transition-all duration-300 hover:opacity-90
                                                    border border-white/10 shadow-lg hover:shadow-xl w-full sm:w-auto"
                                        >
                                            <i className="fas fa-arrow-left mr-2"></i>
                                            Return to Event
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute -z-10 top-1/3 left-10 w-64 h-64 bg-[#223030]/5 rounded-full blur-3xl"></div>
                    <div className="absolute -z-10 bottom-1/4 right-10 w-80 h-80 bg-[#2d4040]/5 rounded-full blur-3xl"></div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f8f8f5] to-white">
            <div className="w-full max-w-4xl">
                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-2">
                        {[1, 2, 3].map((step) => (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0.5 }}
                                animate={{
                                    opacity: step <= currentStep ? 1 : 0.5,
                                    scale: step === currentStep ? 1.1 : 1,
                                }}
                                className="flex flex-col items-center"
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
                                    ${
                                        step < currentStep
                                            ? "bg-[#2d4040]"
                                            : step === currentStep
                                            ? "bg-gradient-to-r from-[#223030] to-[#2d4040]"
                                            : "bg-gray-300"
                                    }`}
                                >
                                    {step < currentStep ? (
                                        <i className="fas fa-check"></i>
                                    ) : (
                                        step
                                    )}
                                </div>
                                <span
                                    className={`text-sm mt-1 ${
                                        step <= currentStep
                                            ? "text-[#2d4040] font-medium"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {step === 1
                                        ? "Personal"
                                        : step === 2
                                        ? "Contact"
                                        : "Confirm"}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#223030] to-[#2d4040]"
                            initial={{ width: "0%" }}
                            animate={{
                                width: `${(currentStep / totalSteps) * 100}%`,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="gradient-bg p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>

                        <h1 className="text-3xl font-bold relative z-10">
                            Register Now
                        </h1>
                        <p className="opacity-90 relative z-10 mt-2">
                            Complete your registration in just a few steps
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-8 space-y-6"
                    >
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-[#2D3436] mb-4">
                                    Tell us about yourself
                                </h2>

                                {/* Name Field */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Full Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                id="name"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223030]"
                                                placeholder="Enter your full name"
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Team Field (Optional) */}
                                <div>
                                    <label
                                        htmlFor="team"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Team/Company (Optional)
                                    </label>
                                    <Controller
                                        name="team"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                id="team"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223030]"
                                                placeholder="Enter your team or company name"
                                            />
                                        )}
                                    />
                                </div>

                                {/* Goals Field */}
                                <div>
                                    <label
                                        htmlFor="goals"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        What are you hoping to achieve at this
                                        event?
                                    </label>
                                    <Controller
                                        name="goals"
                                        control={control}
                                        render={({ field }) => (
                                            <textarea
                                                {...field}
                                                id="goals"
                                                rows={3}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223030] resize-none"
                                                placeholder="Share your goals for attending this event..."
                                            />
                                        )}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Contact Information */}
                        {currentStep === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-[#2D3436] mb-4">
                                    How can we reach you?
                                </h2>

                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email Address{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="email"
                                                id="email"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223030]"
                                                placeholder="Enter your email address"
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Phone Number{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="tel"
                                                id="phone"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223030]"
                                                placeholder="Enter your phone number"
                                            />
                                        )}
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Confirmation */}
                        {currentStep === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-[#2D3436] mb-4">
                                    Confirm your details
                                </h2>

                                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Name:
                                        </span>
                                        <span className="font-medium">
                                            {watchedFields.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Email:
                                        </span>
                                        <span className="font-medium">
                                            {watchedFields.email}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Phone:
                                        </span>
                                        <span className="font-medium">
                                            {watchedFields.phone}
                                        </span>
                                    </div>
                                    {watchedFields.team && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Team/Company:
                                            </span>
                                            <span className="font-medium">
                                                {watchedFields.team}
                                            </span>
                                        </div>
                                    )}
                                    {watchedFields.goals && (
                                        <div className="flex flex-col">
                                            <span className="text-gray-500">
                                                Your goals:
                                            </span>
                                            <span className="font-medium mt-1 text-sm">
                                                {watchedFields.goals}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Controller
                                            name="agreeToTerms"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type="checkbox"
                                                    id="agreeToTerms"
                                                    className="h-4 w-4 text-[#223030] border-gray-300 rounded focus:ring-[#223030]"
                                                    checked={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="agreeToTerms"
                                            className="font-medium text-gray-700"
                                        >
                                            I agree to the{" "}
                                            <a
                                                href="#"
                                                className="text-[#223030] hover:underline"
                                            >
                                                Terms and Conditions
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="#"
                                                className="text-[#223030] hover:underline"
                                            >
                                                Privacy Policy
                                            </a>
                                        </label>
                                        {errors.agreeToTerms && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.agreeToTerms.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t border-gray-100">
                            {currentStep > 1 ? (
                                <motion.button
                                    type="button"
                                    onClick={prevStep}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg 
                                            font-medium transition-all duration-300 hover:bg-gray-50"
                                >
                                    Back
                                </motion.button>
                            ) : (
                                <div></div> // Empty div to maintain flex spacing
                            )}

                            {currentStep < totalSteps ? (
                                <motion.button
                                    type="button"
                                    onClick={nextStep}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-lg 
                                            font-medium transition-all duration-300 hover:opacity-90
                                            border border-white/10 shadow-lg hover:shadow-xl"
                                >
                                    Continue
                                </motion.button>
                            ) : (
                                <motion.button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        !watchedFields.agreeToTerms
                                    }
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-gradient-to-r from-[#223030] to-[#2d4040] text-[#DFEBF6] rounded-lg 
                                            font-medium transition-all duration-300 hover:opacity-90
                                            border border-white/10 shadow-lg hover:shadow-xl
                                            disabled:opacity-50 disabled:cursor-not-allowed
                                            flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>Complete Registration</>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </form>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/3 left-10 w-64 h-64 bg-[#223030]/5 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 bottom-1/4 right-10 w-80 h-80 bg-[#2d4040]/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}

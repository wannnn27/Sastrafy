"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

// ====================
// BUTTON COMPONENT
// ====================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50";

    const variants = {
        primary: "bg-gradient-to-r from-batik-terracotta to-primary-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        secondary: "bg-white text-primary-700 border-2 border-primary-200 hover:bg-primary-50",
        outline: "border-2 border-batik-terracotta text-batik-terracotta hover:bg-batik-terracotta hover:text-white",
        ghost: "text-primary-700 hover:bg-primary-100",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 rounded-xl",
        lg: "px-8 py-4 text-lg rounded-xl",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}

// ====================
// INPUT COMPONENT
// ====================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({
    label,
    error,
    icon,
    className = "",
    ...props
}: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-primary-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
                        {icon}
                    </div>
                )}
                <input
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all bg-white
            ${icon ? "pl-12" : ""}
            ${error
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200"
                            : "border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20"
                        }
            ${className}`}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
}

// ====================
// TEXTAREA COMPONENT
// ====================
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({
    label,
    error,
    className = "",
    ...props
}: TextareaProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-primary-700 mb-1">
                    {label}
                </label>
            )}
            <textarea
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all bg-white resize-none
          ${error
                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200"
                        : "border-primary-200 focus:border-batik-terracotta focus:ring-4 focus:ring-batik-terracotta/20"
                    }
          ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
}

// ====================
// CARD COMPONENT
// ====================
interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
    return (
        <div
            className={`bg-white rounded-2xl shadow-lg border border-primary-100 p-6
        ${hover ? "hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" : ""}
        ${className}`}
        >
            {children}
        </div>
    );
}

// ====================
// BADGE COMPONENT
// ====================
interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "primary" | "success" | "warning" | "error";
    size?: "sm" | "md";
}

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
    const variants = {
        default: "bg-primary-100 text-primary-700",
        primary: "bg-batik-terracotta/10 text-batik-terracotta",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        error: "bg-red-100 text-red-700",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
}

// ====================
// MODAL COMPONENT
// ====================
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg";
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
    const sizes = {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full ${sizes[size]} z-50 p-4`}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl border border-primary-100 overflow-hidden">
                            {title && (
                                <div className="flex items-center justify-between p-6 border-b border-primary-100">
                                    <h2 className="text-xl font-serif font-bold text-primary-800">{title}</h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-primary-600" />
                                    </button>
                                </div>
                            )}
                            <div className="p-6">{children}</div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ====================
// TOAST COMPONENT
// ====================
interface ToastProps {
    message: string;
    type?: "success" | "error" | "warning" | "info";
    isVisible: boolean;
    onClose: () => void;
}

export function Toast({ message, type = "info", isVisible, onClose }: ToastProps) {
    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        warning: <AlertTriangle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
    };

    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500",
    };

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className={`fixed bottom-8 right-8 ${colors[type]} text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 z-50`}
                >
                    {icons[type]}
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ====================
// SPINNER COMPONENT
// ====================
interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
    const sizes = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-4",
        lg: "w-12 h-12 border-4",
    };

    return (
        <div
            className={`inline-block border-batik-terracotta border-t-transparent rounded-full animate-spin ${sizes[size]} ${className}`}
        />
    );
}

// ====================
// AVATAR COMPONENT  
// ====================
interface AvatarProps {
    src?: string;
    name?: string;
    size?: "sm" | "md" | "lg";
}

export function Avatar({ src, name, size = "md" }: AvatarProps) {
    const sizes = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    if (src) {
        return (
            <img
                src={src}
                alt={name || "Avatar"}
                className={`${sizes[size]} rounded-full object-cover`}
            />
        );
    }

    return (
        <div
            className={`${sizes[size]} rounded-full bg-gradient-to-br from-batik-terracotta to-batik-gold flex items-center justify-center text-white font-medium`}
        >
            {name ? getInitials(name) : "?"}
        </div>
    );
}

// ====================
// SKELETON COMPONENT
// ====================
interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-primary-200 rounded ${className}`}
        />
    );
}

// ====================
// EMPTY STATE COMPONENT
// ====================
interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-primary-800 mb-2">{title}</h3>
            {description && (
                <p className="text-primary-600 mb-6">{description}</p>
            )}
            {action}
        </div>
    );
}

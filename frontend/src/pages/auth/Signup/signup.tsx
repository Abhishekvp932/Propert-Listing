import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Signup } from "@/services/auth";
import { handleApiError } from "@/utils/handleApiError";

interface SignupData {
  phone:string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorData {
  phone?:string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone:""
  });
  const [error, setError] = useState<ErrorData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone:""
  });
  const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState("");
  const navigation = useNavigate();
  const validation = () => {
    const newError = { name: "", email: "", password: "", confirmPassword: "" ,phone:""};
    let isValidate = true;

    if (!formData.name) {
      newError.name = "Name is required";
      isValidate = false;
    }

    if (!formData.email) {
      newError.email = "Email is required";
      isValidate = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        newError.email = "Email format is not correct";
        isValidate = false;
      }
    }

    if(!formData.phone){
        newError.phone = "Phone Number Required"
        isValidate = false;
    }else if(formData.phone.length < 10){
       newError.phone = 'Phone number must be 10 degits'
       isValidate = false;
    }

    if (!formData.password) {
      newError.password = "Password is required";
      isValidate = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Password must be same";
      isValidate = false;
    }

    setError(newError);
    return isValidate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation()) return;
    setIsLoading(true);

    try {
      const res = await Signup(
        formData.name,
        formData.email,
        formData.phone,
        formData.password,
      );
      toast.success(res.msg);
      setIsLoading(false);
      navigation('/');
    } catch (error) {
      toast.error(handleApiError(error));
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      {/* Left Section - Property Image */}
      <div className="hidden lg:flex bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-40 sm:w-64 h-40 sm:h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-80 h-48 sm:h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-6 sm:px-8">
          <div className="mb-6 sm:mb-8">
            <svg
              className="w-16 sm:w-20 h-16 sm:h-20 mx-auto text-white mb-4 sm:mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-3m0 0l7-4 7 4M5 9v7a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m0 0H9m3 0h3"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">
            PropertyHub
          </h1>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            Join thousands of property buyers and sellers. List your home or
            find your dream property today.
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex items-center justify-center w-full min-h-screen lg:min-h-auto px-4 sm:px-6 py-8 sm:py-12">
        <Card className="w-full max-w-sm sm:max-w-md border-0 shadow-lg">
          <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-6 sm:w-8 h-6 sm:h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-3m0 0l7-4 7 4M5 9v7a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m0 0H9m3 0h3"
                  />
                </svg>
                <span className="text-lg sm:text-xl font-bold text-foreground">
                  PropertyHub
                </span>
              </div>
            </div>

            {/* Form Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Create account
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Join us and start your property journey
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-xs sm:text-sm font-medium text-foreground"
                >
                  Full name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                />
                {error.name && <p style={{ color: "red" }}>{error.name}</p>}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-foreground"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                />
                {error.email && <p style={{ color: "red" }}>{error.email}</p>}
              </div>

               <div className="space-y-2">
                <label
                  htmlFor="Phone"
                  className="block text-xs sm:text-sm font-medium text-foreground"
                >
                 Phone
                </label>
                <Input
                  id="phone"
                  type="phone"
                  placeholder="12345678910"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                />
                {error.phone && <p style={{ color: "red" }}>{error.phone}</p>}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                />
                {error.password && (
                  <p style={{ color: "red" }}>{error.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs sm:text-sm font-medium text-foreground"
                >
                  Confirm password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                />
                {error.confirmPassword && (
                  <p style={{ color: "red" }}>{error.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 sm:py-2.5 rounded-md transition-colors text-sm sm:text-base"
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-muted-foreground font-medium">
                OR
              </span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-primary hover:text-primary/90 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
      <ToastContainer autoClose={200} />
    </main>
  );
}

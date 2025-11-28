
"use client";

import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:3010/api/auth/forgetpassword",
        { email }
      );
      console.log("Response: ", response);

      if (response.data.status === "sucess") {
        setMessage(response.data.message);
        setOtp(response.data.otp);
        sendOtp(response.data.otp);
        router.push(`/resetPassword/${response.data.userId}`);
      } else {
        console.log("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = (otp) => {
    const serviceID = process.env.SERVICEID;
    const templateID = process.env.TEMPLATEID;
    const userID = process.env.USERID;

    const templateData = {
      from_name: "Codex Support",
      form_email: email,
      to_name: "User",
      message: `Your OTP to reset password is: ${otp}`,
    };

    emailjs
      .send(serviceID, templateID, templateData, userID)
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setStatusMessage("OTP sent successfully!");
        },
        (error) => {
          console.error("Failed to send email:", error);
          setStatusMessage("Error sending OTP.");
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500 p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border border-sky-100 dark:border-gray-700 shadow-xl rounded-2xl p-6">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Enter your registered email to receive an OTP
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/60 dark:bg-gray-800/60 focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" /> Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>

          {message && (
            <p className="mt-3 text-center text-sm text-green-600 dark:text-green-400">
              {message}
            </p>
          )}

          {statusMessage && (
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              {statusMessage}
            </p>
          )}

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-indigo-600 dark:text-sky-400 font-medium hover:underline"
            >
              Go back to Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

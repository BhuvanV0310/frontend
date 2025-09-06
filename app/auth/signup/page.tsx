"use client";
import React, { useState } from "react";
// Update the import path to match your project structure
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { registerUser } from "../services/auth";
import Link from "next/link";

type Branch = {
  name: string;
  location: string;
  reviewLink: string;
  contactNo: string;
};

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState({
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    organisationName: "",
    organisationEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [branchType, setBranchType] = useState<"single" | "multiple">("single");
  const [branches, setBranches] = useState<Branch[]>([{ name: "", location: "", reviewLink: "", contactNo: "" }]);
  const [numBranches, setNumBranches] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Company form handlers
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  // Branch form handlers
  const handleBranchChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...branches];
    updated[idx][e.target.name as keyof Branch] = e.target.value;
    setBranches(updated);
  };

  // Step 1 validation
  const validateCompany = () => {
    if (
      !company.contactName ||
      !company.contactEmail ||
      !company.contactNumber ||
      !company.organisationName ||
      !company.password ||
      !company.confirmPassword
    ) return "All fields except Organisation Email are required.";
    if (company.password !== company.confirmPassword) return "Passwords do not match.";
    return null;
  };

  // Step 2 branch count handler
  const handleNumBranches = (n: number) => {
    setNumBranches(n);
    setBranches(Array(n).fill({ name: "", location: "", reviewLink: "", contactNo: "" }));
  };

  // Step 2 validation
  const validateBranches = () => {
    for (const b of branches) {
      if (!b.name || !b.location || !b.reviewLink || !b.contactNo) return "All branch fields are required.";
    }
    return null;
  };

  // Stepper UI
  const stepper = (
    <div className="flex justify-center mb-6">
      <div className="flex gap-4">
        <div className={`flex flex-col items-center`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? "bg-[#0047ab] text-white" : "bg-gray-300 text-gray-700"}`}>1</div>
          <span className="text-xs mt-1">Company</span>
        </div>
        <div className="w-8 h-0.5 bg-gray-300 mt-4" />
        <div className={`flex flex-col items-center`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? "bg-[#0047ab] text-white" : "bg-gray-300 text-gray-700"}`}>2</div>
          <span className="text-xs mt-1">Branch</span>
        </div>
      </div>
    </div>
  );

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (step === 1) {
      const err = validateCompany();
      if (err) return setError(err);
      setStep(2);
      return;
    }
    const err = validateBranches();
    if (err) return setError(err);
    setLoading(true);
    try {
      const payload = {
        ...company,
        branches,
      };
      const res = await registerUser(payload);
      if (res.success) {
        setSuccess("Registration successful! You can now login.");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch {
      setError("Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-lg rounded-xl shadow-lg border-0" style={{ borderColor: "#0047ab" }}>
        <CardHeader className="text-center text-2xl font-bold text-[#0047ab]">Sign Up</CardHeader>
        <CardContent>
          {stepper}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <Input
                  name="contactName"
                  placeholder="Contact Name"
                  value={company.contactName}
                  onChange={handleCompanyChange}
                  required
                />
                <Input
                  name="contactEmail"
                  type="email"
                  placeholder="Contact Email (User ID)"
                  value={company.contactEmail}
                  onChange={handleCompanyChange}
                  required
                />
                <Input
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={company.contactNumber}
                  onChange={handleCompanyChange}
                  required
                />
                <Input
                  name="organisationName"
                  placeholder="Organisation Name"
                  value={company.organisationName}
                  onChange={handleCompanyChange}
                  required
                />
                <Input
                  name="organisationEmail"
                  type="email"
                  placeholder="Organisation Email (optional)"
                  value={company.organisationEmail}
                  onChange={handleCompanyChange}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={company.password}
                  onChange={handleCompanyChange}
                  required
                />
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={company.confirmPassword}
                  onChange={handleCompanyChange}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#0047ab] text-white hover:bg-blue-700"
                >
                  Next
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <Tabs value={branchType} onValueChange={v => setBranchType(v as "single" | "multiple")}>
                  <TabsList className="mb-2">
                    <TabsTrigger value="single">Single Branch</TabsTrigger>
                    <TabsTrigger value="multiple">Multiple Branches</TabsTrigger>
                  </TabsList>
                </Tabs>
                {branchType === "multiple" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      value={numBranches}
                      onChange={e => handleNumBranches(Number(e.target.value))}
                      className="w-24"
                    />
                    <span className="text-sm">branches</span>
                  </div>
                )}
                {branches.map((branch, idx) => (
                  <div key={idx} className="border rounded-lg p-3 mb-2 bg-gray-50">
                    <div className="font-semibold mb-2 text-[#0047ab]">Branch {idx + 1}</div>
                    <Input
                      name="name"
                      placeholder="Branch Name"
                      value={branch.name}
                      onChange={e => handleBranchChange(idx, e)}
                      required
                    />
                    <Input
                      name="location"
                      placeholder="Location"
                      value={branch.location}
                      onChange={e => handleBranchChange(idx, e)}
                      required
                    />
                    <Input
                      name="reviewLink"
                      placeholder="Review Link"
                      value={branch.reviewLink}
                      onChange={e => handleBranchChange(idx, e)}
                      required
                    />
                    <Input
                      name="contactNo"
                      placeholder="Contact Number"
                      value={branch.contactNo}
                      onChange={e => handleBranchChange(idx, e)}
                      required
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  className="w-full bg-[#0047ab] text-white hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Submit"}
                </Button>
              </>
            )}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-sm text-center">{success}</div>
            )}
          </form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#0047ab] font-medium hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
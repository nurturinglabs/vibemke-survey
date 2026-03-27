"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onUnlock: (passcode: string) => void;
  error: string;
  loading: boolean;
}

export default function PasscodeGate({ onUnlock, error, loading }: Props) {
  const [passcode, setPasscode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock(passcode);
  };

  return (
    <div className="min-h-screen bg-[#1A1714] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-extrabold text-[#E8A838] text-center tracking-widest uppercase mb-2">
          Vibe MKE
        </h1>
        <p className="text-[#F5EDE099] text-center mb-8">
          Enter the dashboard passcode
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="bg-[#2A2522] border-[#C4613A33] text-[#F5EDE0] placeholder:text-[#F5EDE044]"
            autoFocus
          />
          {error && <p className="text-sm text-[#C4613A]">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || !passcode}>
            {loading ? "Verifying..." : "Enter Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}

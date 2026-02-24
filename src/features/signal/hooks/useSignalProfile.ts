"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_SIGNAL_PROFILE, type SignalProfile } from "../types";
import {
  readSignalActive,
  readSignalProfile,
  writeSignalActive,
  writeSignalProfile,
} from "../services/signal.service";

export const useSignalProfile = () => {
  const [active, setActiveState] = useState(false);
  const [profile, setProfile] = useState<SignalProfile>(DEFAULT_SIGNAL_PROFILE);
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    setActiveState(readSignalActive());
    setProfile(readSignalProfile());
    setHydrated(true);
  }, []);

  const setActive = (next: boolean) => {
    setActiveState(next);
    writeSignalActive(next);
  };

  const saveProfile = async (next: SignalProfile) => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    const updated = { ...next, updatedAt: new Date().toISOString() };
    writeSignalProfile(updated);
    setProfile(updated);
    setSavedAt(updated.updatedAt);
    setSaving(false);
  };

  const isValid = useMemo(() => {
    if (!profile.headline.trim()) return false;
    if (profile.roles.length === 0) return false;
    if (profile.hourlyMin !== null && profile.hourlyMax !== null && profile.hourlyMin > profile.hourlyMax) {
      return false;
    }
    return true;
  }, [profile]);

  return {
    active,
    setActive,
    profile,
    setProfile,
    saveProfile,
    isValid,
    hydrated,
    saving,
    savedAt,
  };
};

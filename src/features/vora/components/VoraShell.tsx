"use client";

import { useEffect, useMemo, useState } from "react";
import { VORA_SETTINGS_CHANGE_EVENT, readVoraPreferences } from "../config";
import VoraDrawer from "./VoraDrawer";
import VoraOrb from "./VoraOrb";
import VoraSideGlow from "./VoraSideGlow";

export default function VoraShell() {
  const [orbOpen, setOrbOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [glowEnabled, setGlowEnabled] = useState(true);
  const active = useMemo(() => drawerOpen && glowEnabled, [drawerOpen, glowEnabled]);

  useEffect(() => {
    const sync = () => {
      setGlowEnabled(readVoraPreferences().glow);
    };

    sync();
    window.addEventListener(VORA_SETTINGS_CHANGE_EVENT, sync);
    return () => window.removeEventListener(VORA_SETTINGS_CHANGE_EVENT, sync);
  }, []);

  return (
    <>
      <VoraSideGlow active={active} />
      <VoraOrb
        open={orbOpen}
        active={active}
        onClick={() => {
          setOrbOpen((prev) => !prev);
          setDrawerOpen(true);
        }}
      />
      <VoraDrawer
        open={drawerOpen}
        onOpenChange={(next) => {
          setDrawerOpen(next);
          if (!next) setOrbOpen(false);
        }}
      />
    </>
  );
}

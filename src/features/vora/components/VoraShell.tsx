"use client";

import { useMemo, useState } from "react";
import VoraDrawer from "./VoraDrawer";
import VoraOrb from "./VoraOrb";
import VoraSideGlow from "./VoraSideGlow";

export default function VoraShell() {
  const [orbOpen, setOrbOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const active = useMemo(() => drawerOpen, [drawerOpen]);

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

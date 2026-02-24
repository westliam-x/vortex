"use client";

import { useState } from "react";
import { Bell, Code2, Search } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Drawer,
  IconButton,
  Input,
  Modal,
  Select,
  Tabs,
  Textarea,
} from "@/components/ui";

export default function DevUiPage() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const simulateAction = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-10 text-[var(--text)] md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">UI Foundation Showcase</h1>
          <p className="font-meta text-sm text-[var(--muted)]">
            Tokens + primitives for developer-first workflows.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <Card className="space-y-4">
            <h2 className="text-lg font-medium">Buttons</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
              <Button loading={loading} onClick={simulateAction}>
                Loading State
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <IconButton aria-label="Search" variant="outline">
                <Search size={16} />
              </IconButton>
              <IconButton aria-label="Notifications" variant="secondary">
                <Bell size={16} />
              </IconButton>
              <IconButton aria-label="Code" variant="primary" disabled>
                <Code2 size={16} />
              </IconButton>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-medium">Badges + Form Inputs</h2>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="error">Error</Badge>
              <Badge tone="info">Info</Badge>
            </div>
            <div className="space-y-3">
              <Input placeholder="Normal input" />
              <div className="space-y-1">
                <Input error placeholder="Input error state" />
                <p className="text-xs text-[var(--danger)]">This field is required.</p>
              </div>
              <Textarea placeholder="Textarea" rows={3} />
              <Select defaultValue="pending">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Select>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card className="space-y-4">
            <h2 className="text-lg font-medium">Tabs</h2>
            <Tabs
              items={[
                {
                  value: "overview",
                  label: "Overview",
                  content: <p className="text-sm text-[var(--muted)]">Overview panel content.</p>,
                },
                {
                  value: "activity",
                  label: "Activity",
                  content: <p className="text-sm text-[var(--muted)]">Recent activity panel content.</p>,
                },
                {
                  value: "files",
                  label: "Files",
                  content: <p className="text-sm text-[var(--muted)]">Attached files panel content.</p>,
                },
              ]}
            />
          </Card>

          <Card className="space-y-4">
            <h2 className="text-lg font-medium">Modal + Drawer</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setOpenModal(true)}>
                Open Modal
              </Button>
              <Button variant="outline" onClick={() => setOpenDrawer(true)}>
                Open Drawer
              </Button>
            </div>
            <p className="text-sm text-[var(--muted)]">Hover state available on all interactive elements.</p>
          </Card>
        </section>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Project Access"
        description="Confirm invite details before sending."
      >
        <div className="space-y-4">
          <Input placeholder="Email address" />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpenModal(false)}>Send Invite</Button>
          </div>
        </div>
      </Modal>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} title="Activity Details">
        <div className="space-y-3">
          <p className="font-meta text-sm text-[var(--muted)]">LOG-2048</p>
          <p className="text-sm text-[var(--text)]">Project updated by owner.</p>
          <Button variant="secondary" onClick={() => setOpenDrawer(false)}>
            Close
          </Button>
        </div>
      </Drawer>
    </main>
  );
}

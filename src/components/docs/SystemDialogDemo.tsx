"use client";

import { useState } from "react";
import { SystemDialog } from "@/components/SystemDialog";
import { Button } from "@/components/Button";

export function SystemDialogNormalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
        OPEN NORMAL DIALOG
      </Button>
      <SystemDialog
        open={open}
        title="SYSTEM NOTIFICATION"
        severity="normal"
        onAccept={() => setOpen(false)}
        onDecline={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <p className="text-nerv-white text-sm font-mono">
          Routine maintenance scheduled for 0300 hours.
        </p>
      </SystemDialog>
    </div>
  );
}

export function SystemDialogWarningDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="danger" size="sm" onClick={() => setOpen(true)}>
        OPEN WARNING DIALOG
      </Button>
      <SystemDialog
        open={open}
        title="OVERRIDE REQUEST"
        severity="warning"
        acceptText="AUTHORIZE"
        declineText="ABORT"
        onAccept={() => setOpen(false)}
        onDecline={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <p className="text-nerv-white text-sm font-mono">
          MAGI authorization required for Unit-01 activation.
        </p>
      </SystemDialog>
    </div>
  );
}

export function SystemDialogCriticalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="danger" size="sm" onClick={() => setOpen(true)}>
        OPEN CRITICAL DIALOG
      </Button>
      <SystemDialog
        open={open}
        title="SELF-DESTRUCT CONFIRMATION"
        severity="critical"
        acceptText="CONFIRM"
        declineText="ABORT"
        showHazardStripes
        onAccept={() => setOpen(false)}
        onDecline={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <p className="text-nerv-white text-sm font-mono">
          This action is irreversible. All personnel must evacuate.
        </p>
      </SystemDialog>
    </div>
  );
}

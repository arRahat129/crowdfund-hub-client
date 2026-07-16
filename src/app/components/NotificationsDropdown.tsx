"use client";

import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../lib/api";

type NotificationItem = {
  _id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiRequest("/api/notifications");
        setNotifications(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
      >
        🔔 {unreadCount > 0 ? `(${unreadCount})` : ""}
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-2xl shadow-cyan-950/30">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Notifications</p>
            <span className="text-xs text-slate-400">{notifications.length} total</span>
          </div>
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-sm text-slate-400">No notifications yet.</p>
            ) : (
              notifications.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-2 text-sm text-slate-300">
                  <p>{item.message}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.type}</p>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

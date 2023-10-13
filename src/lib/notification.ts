import { writable } from "svelte/store";

type Notification = string;

export const notifications = writable<Notification[]>([]);

export function toast(message: string) {
  notifications.update((state) => [...state, message]);

  setTimeout(removeToast, 2000);
}

function removeToast() {
  notifications.update((state) => {
    return [...state.slice(1)];
  });
}

import type { AddNotification, SiteNotification } from "@/definitions/notify";
import { ref } from "vue";

const NOTIFICATION_DURATION = 20;

const notifications = ref<SiteNotification[]>([]);
let id = 0;

const addNotification = ({
  text,
  color = "",
  highlightText,
}: AddNotification) => {
  const idCopy = id;
  notifications.value.push({ id, text, color, highlightText });
  setTimeout(() => deleteNotification(idCopy), NOTIFICATION_DURATION * 1000);
  id++;
};

const deleteNotification = (targetId: number) => {
  notifications.value = notifications.value.filter(({ id }) => id !== targetId);
};

export const useNotify = () => ({
  notifications,
  addNotification,
  deleteNotification,
});

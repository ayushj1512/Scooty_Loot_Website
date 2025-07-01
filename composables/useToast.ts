// composables/useToast.ts
import { useState } from "nuxt/app";

type ToastType = "success" | "warning" | "failure";

export const useToast = () => {
  const toastMessage = useState<string>("toast-message", () => "");
  const toastVisible = useState<boolean>("toast-visible", () => false);
  const toastType = useState<ToastType>("toast-type", () => "success");

  const show = (message: string, type: ToastType = "success") => {
    toastMessage.value = message;
    toastType.value = type;
    toastVisible.value = true;

    setTimeout(() => {
      toastVisible.value = false;
    }, 2500);
  };

  return {
    toastMessage,
    toastVisible,
    toastType,
    show,
  };
};

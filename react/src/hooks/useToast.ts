import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ToastNotification from "../entities/Toast";

export function useToastHook() {
  const [toastState, setToast] = useState<ToastNotification>();
  const toast = useToast();

  useEffect(() => {
    if (toastState) {
      toast({
        title: toastState.title,
        description: toastState.description,
        status: toastState.status,
        duration: toastState.duration,
        position: toastState.position,
        isClosable: true,
      });
    }
  }, [toastState, toast]);

  return {toastState, setToast};
}

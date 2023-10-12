export default interface ToastNotification {
  title: string;
  status: "info" | "warning" | "success" | "error" | "loading";
  description: string;
  duration?: number;
  position?:
    | "top"
    | "top-right"
    | "top-left"
    | "bottom"
    | "bottom-right"
    | "bottom-left";
}
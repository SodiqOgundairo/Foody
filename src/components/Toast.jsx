import { useToast } from "../context/ToastContext";

const variants = {
  success: "bg-emerald-600 text-white",
  info: "bg-stone-700 text-white",
  error: "bg-red-600 text-white",
};

export default function Toast() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-enter rounded-xl px-5 py-3 shadow-lg max-w-xs cursor-pointer ${variants[t.variant] || variants.success}`}
          onClick={() => dismiss(t.id)}
        >
          <p className="font-semibold text-sm">{t.title}</p>
          {t.description && (
            <p className="text-xs opacity-90 mt-0.5">{t.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

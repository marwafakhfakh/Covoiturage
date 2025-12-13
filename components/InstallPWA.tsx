"use client";

import { useEffect, useState } from "react";

let deferredPrompt: any = null;

export default function InstallPWA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    deferredPrompt = null;
    setVisible(false);
  };

  const handleCancel = () => {
    deferredPrompt = null;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold mb-3">
          Installer l’application
        </h2>

        <p className="text-gray-600 mb-5">
          Voulez-vous installer cette application sur votre appareil ?
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleInstall}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            Installer
          </button>

          <button
            onClick={handleCancel}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

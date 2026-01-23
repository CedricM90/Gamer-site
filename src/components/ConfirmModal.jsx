import { useEffect } from "react";

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  // Fermeture avec touche Échap
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // bloque le scroll
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Annuler
          </button>
          <button className="btn confirm" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
import { MoveLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button className="rounded-xl px-2 hover:bg-neutral" onClick={handleBack}>
      <MoveLeft />
    </button>
  );
};

export default BackButton;

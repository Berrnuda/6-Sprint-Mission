import React from "react";
import { Link } from "react-router-dom";
import "../style/header.css";

interface LinkButtonProps {
  children: React.ReactNode;
  to?: string;
}

export default function LinkButton({ children, to = "/" }: LinkButtonProps) {
  return (
    <Link to={to}>
      <div className="button">{children}</div>
    </Link>
  );
}

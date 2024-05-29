"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import "./TextareaWithLimit.css";

interface TextareaWithLimitProps {
  limit: number;
  value: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaWithLimit: React.FC<TextareaWithLimitProps> = ({
  limit,
  value,
  className,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (textareaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const renderText = () => {
    const lines = value.split("\n");
    return lines.map((line, index) => {
      const withinLimit = line.slice(0, limit) || "\u00A0";
      const exceedingLimit = line.slice(limit);
      const isNotLastLine = index < lines.length - 1;
      return (
        <p key={index} className={withinLimit.trim() ? "element" : ""}>
          <span>{withinLimit}</span>
          <span className="text-red-500">{exceedingLimit}</span>
          {isNotLastLine && <br />}
        </p>
      );
    });
  };

  return (
    <div className={"relative " + className}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onScroll={handleScroll}
      />
      <div id="overlay" ref={overlayRef}>
        {renderText()}
      </div>
    </div>
  );
};

export default TextareaWithLimit;

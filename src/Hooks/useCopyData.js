import { useState } from "react";
import toast from "react-hot-toast";

function useCopyData() {
  const [copiedText, setCopiedText] = useState(null);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success("Successfully Copied");
      return true;
    } catch (error) {
      toast.error("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy, setCopiedText];
}

export default useCopyData;

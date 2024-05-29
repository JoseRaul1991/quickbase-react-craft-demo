import { useEffect, useState } from "react";
import { MultiselectFormValues } from "../models/multi-select-form";
import { getMultiselect, updateMultiselect } from "../services/api";

export const useMultiselect = () => {
  const [multiselect, setMultiselect] = useState<MultiselectFormValues | null>(
    null
  );

  useEffect(() => {
    const value = getMultiselect("mock-id");
    setMultiselect(value);
  }, []);

  return { multiselect, updateMultiselect };
};

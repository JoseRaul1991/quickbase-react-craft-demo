import { useEffect, useState } from "react";
import { MultiselectFormValues } from "../models/MultiselectForm";
import { getMultiselect, updateMultiselect } from "../services/api";

export const useMultiselect = (id: string) => {
  const [multiselect, setMultiselect] = useState<MultiselectFormValues | null>(
    null
  );

  useEffect(() => {
    const value = getMultiselect("mock-id");
    setMultiselect(value);
  }, []);

  return { multiselect, updateMultiselect };
};

import { ComboBoxOption } from "@aws-amplify/ui-react";
import { Schema } from "ROOT/amplify/data/resource";

export const convertoOrgTypeToComboBoxOption = (
  orgArray: Schema["Organization"]["type"][]
): ComboBoxOption[] => {
  return orgArray.map((org) => {
    return {
      id: org.id as string,
      label: org.name as string,
    };
  });
};

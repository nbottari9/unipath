
export const convertoOrgTypeToComboBoxOption = (
  orgArray: any[]
): any[] => {
  return orgArray.map((org) => {
    return {
      id: org.id as string,
      label: org.name as string,
    };
  });
};

export const getDate = (stringDate: string = ""): string =>
  stringDate
    ? new Date(stringDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

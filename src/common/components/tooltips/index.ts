import EN from "./strings/EN";

export const toolTipForIds = (...ids: any[]) => {
  for (const id of ids) {
    const tip = toolTipForId(id);
    if (tip) {
      return tip;
    }
  }
  if (process.env.NODE_ENV === "development") {
    console.debug(`Tooltip not found for ${ids.join("|")}`);
  }
  return null;
};

const toolTipForId = (id: any) => {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const toolTip = EN[id];
  if (toolTip) {
    return toolTip;
  }
  return null;
};

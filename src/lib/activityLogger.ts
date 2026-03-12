export const logActivity = async (
  actionType: string,
  metadata: Record<string, unknown> = {}
) => {
  console.log("[Activity]", actionType, metadata);
};

export type Tier = "short" | "medium" | "long" | "longReduced";

export type EligibilityReason =
  | "missing"
  | "delayTooShort"
  | "short"
  | "medium"
  | "longReduced"
  | "long";

export type Eligibility = {
  eligible: boolean;
  amount: number;
  tier: Tier | null;
  reason: EligibilityReason;
};

export type EU261Input = {
  distanceKm: number | null;
  delayHours: number;
  bothEU: boolean;
};

export function computeCompensation(input: EU261Input): Eligibility {
  const { distanceKm, delayHours, bothEU } = input;

  if (distanceKm == null) {
    return { eligible: false, amount: 0, tier: null, reason: "missing" };
  }

  if (delayHours < 3) {
    return {
      eligible: false,
      amount: 0,
      tier: null,
      reason: "delayTooShort",
    };
  }

  if (distanceKm <= 1500) {
    return { eligible: true, amount: 250, tier: "short", reason: "short" };
  }

  if (distanceKm <= 3500 || bothEU) {
    return { eligible: true, amount: 400, tier: "medium", reason: "medium" };
  }

  if (delayHours < 4) {
    return {
      eligible: true,
      amount: 300,
      tier: "longReduced",
      reason: "longReduced",
    };
  }

  return { eligible: true, amount: 600, tier: "long", reason: "long" };
}

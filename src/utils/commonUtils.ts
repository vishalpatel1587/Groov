import { CHECKIN_FREQUENCY } from "../types/CheckinFrequency";
import { Ritual } from "../types/Ritual";

export const getCheckinFrequencylabel = (ritual: Ritual): string => {
  let checkinFrequencyLabel = ritual.checkinFrequency?.toLowerCase();
  if (
    !!ritual.checkinFrequency &&
    ritual.checkinFrequency !== CHECKIN_FREQUENCY.NO_CHECKINS
  ) {
    checkinFrequencyLabel = `Check-in ${checkinFrequencyLabel}`;
  }

  return checkinFrequencyLabel;
};

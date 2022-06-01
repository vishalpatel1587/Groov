import { CHECKIN_FREQUENCY } from "../../../types/CheckinFrequency";
import { Ritual } from "../../../types/Ritual";
import { getCheckinFrequencylabel } from "../../../utils/commonUtils";

describe("getCheckinFrequencylabel", () => {
  let ritual: Ritual;
  beforeEach(() => {
    ritual = {
      id: "1",
      action: "At the start of each week",
      trigger:
        "Look back at how amazing the weekend was and dream of the next one",
      checkinFrequency: CHECKIN_FREQUENCY.NO_CHECKINS,
      lastUpdateTime: new Date(),
      teamId: "team1",
    };
  });

  it("should display `no-checkins` when no check in frequency is selected", () => {
    const checkinFrequencylabel = getCheckinFrequencylabel(ritual);
    expect(checkinFrequencylabel).toEqual("no check-ins");
  });

  it("should display `Check-in every week` when Check in frequency is 1 week", () => {
    ritual.checkinFrequency = CHECKIN_FREQUENCY.EVERY_WEEK;
    const checkinFrequencylabel = getCheckinFrequencylabel(ritual);
    expect(checkinFrequencylabel).toEqual("Check-in every week");
  });

  it("should display `Check-in every 2 weeks` when Check in frequency is 2 weeks", () => {
    ritual.checkinFrequency = CHECKIN_FREQUENCY.EVERY_2_WEEKS;
    const checkinFrequencylabel = getCheckinFrequencylabel(ritual);
    expect(checkinFrequencylabel).toEqual("Check-in every 2 weeks");
  });

  it("should display `Check-in every month` when Check in frequency is 1 month", () => {
    ritual.checkinFrequency = CHECKIN_FREQUENCY.EVERY_MONTH;
    const checkinFrequencylabel = getCheckinFrequencylabel(ritual);
    expect(checkinFrequencylabel).toEqual("Check-in every month");
  });

  it("should display `Check-in every 2 months` when Check in frequency is 2 months", () => {
    ritual.checkinFrequency = CHECKIN_FREQUENCY.EVERY_2_MONTHS;
    const checkinFrequencylabel = getCheckinFrequencylabel(ritual);
    expect(checkinFrequencylabel).toEqual("Check-in every 2 months");
  });

  it("should display `Check-in every 3 months` when Check in frequency is 3 months", () => {
    ritual.checkinFrequency = CHECKIN_FREQUENCY.EVERY_3_MONTHS;
    const checkinFrequencylabel = getCheckinFrequencylabel(ritual);
    expect(checkinFrequencylabel).toEqual("Check-in every 3 months");
  });
});

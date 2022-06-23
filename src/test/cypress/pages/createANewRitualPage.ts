import { CreateANewRitualPageTestId } from "../../constants/createANewRitualPageTestId";
import { GeneralTestId } from "../../constants/generalTestId";
import CommonHelper from "../helper/commonHelper";

const commonHelper = new CommonHelper();
class CreateANewRitualPage {
  private triggerTextBox: string;
  private actionTextBox: string;
  private checkInFrequencyDropdown: string;
  private createButton: string;
  private guideText: string;

  constructor() {
    this.guideText = `[data-testid="${GeneralTestId.AddorEditRitualGuideText}"]`;
    this.triggerTextBox = `[data-testid="${CreateANewRitualPageTestId.TriggerTextBox}"]`;
    this.actionTextBox = `[data-testid="${CreateANewRitualPageTestId.ActionTextBox}"]`;
    this.checkInFrequencyDropdown = `[data-testid="${CreateANewRitualPageTestId.CheckInFrequencyDropDown}"]`;
    this.createButton = `[data-testid="${GeneralTestId.ConfirmActionButton}"]`;
  }

  public verifyCreateANewRitualModalOpen(guideText: string) {
    cy.get(this.guideText).contains(guideText);
  }

  public populateTrigger(dataTable: {
    hashes: () => { [x: string]: string }[];
  }) {
    cy.get(this.triggerTextBox).type(dataTable.hashes()[0]["Trigger"]);
  }

  public populateAction(dataTable: {
    hashes: () => { [x: string]: string }[];
  }) {
    cy.get(this.actionTextBox).type(dataTable.hashes()[0]["Action"]);
  }

  public populateCheckinFrequency(dataTable: {
    hashes: () => { [x: string]: string }[];
  }) {
    commonHelper.selectCheckinFrequency(
      this.checkInFrequencyDropdown,
      dataTable.hashes()[0]["CheckinFrequency"]
    );
  }

  public clickCreate() {
    cy.get(this.createButton).click();
  }
}

export default CreateANewRitualPage;

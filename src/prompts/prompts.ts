export const confirmAlertPrompts = {
  title: `Confirm`,
  description: `Are you sure you want to sign out?`,
  confirmButtonText: `Yes`,
  cancelButtonText: `No`,
};

export const toasterPrompts = {
  titles: {
    success: `Yay, all done`,
    working: `Yay! Everything worked`,
    warning: `Whoa whoa, slow down`,
    error: `Uh oh, something went wrong`,
  },
  messages: {
    domain: {
      addSuccess: `Domain added successfully`,
      addError: `Sorry, there was a problem with your request`,
      removeSuccess: `Domain removed successfully`,
      removeError: `Sorry, there was a problem with your request`,
    },
    user: {
      addSuccess: `Individual added successfully`,
      addError: `Sorry, there was a problem with your request`,
      removeSuccess: `Individual removed successfully`,
      removeError: `Sorry, there was a problem with your request`,
      removeOneselfError: `Sorry, this account can't be removed`,
    },
    users: {
      addSuccess: `Individuals added successfully`,
      addError: `All individuals were previously added`,
      removeSuccess: `Individuals removed successfully`,
      removeError: `Sorry, there was a problem with your request`,
    },
    token: {
      expireError: `Your session has timed out due to inactivity. Please sign in again.`,
    },
    login: {
      invalidCredentials: `Invalid account credentials.`,
    },
    member: {
      removeMember: `Member removed.`,
      addMember: `member(s) added.`,
    },
  },
};

export const instructions = {
  addOrRemovePage: {
    addIndividual: `To add an individual, simply add their email address to the field below, or upload a CSV file to add several people / staff members at once.`,
    removeIndividual: `To remove an individual simply add their email address to the field below or upload a CSV file to remove several people / team members at once.`,
  },
  manageDomainsPage: {
    manageDomains: `Looking for a simple way to set up your account? You can allow staff to access Groov using your
    organisation’s domain name. This will allow anyone who has a valid email address from your domain to
    register and associate their account with your workplace.`,
  },
  helpPage: {
    needAssistance: `Here you will find some helpful resources. If you have any questions, or you’re having trouble getting set up, please don’t hesitate to contact us at support@mentemia.com.`,
  },
};

export const HeaderPrompts = {
  signOutButtonText: "Sign out",
};

export const OrgOverviewPrompts = {
  navHeaders: {
    key_insights: "Key Insights",
    tools_content: "Tools & Content",
    highlights: "Highlights & Recommendations",
  },
};

export const HighlightPrompts = {
  highlightsNotFound:
    "There are no highlights to show at the moment, please check back later.",
};

export const RitualsHeaderPropts = {
  ritualsHead: {
    companyRituals: "Company rituals",
    teamRituals: "Team rituals",
  },
  titleInfo: {
    companyPageInfo: `A simple way to bake wellbeing into your workspace is to create rituals for team wellbeing.
                        The idea is to link a wellbeing action, like group deep breathing, to something in your work day(a
                        trigger), such as a regular meeting. In this way, wellbeing becomes an automatic part  of every day.`,
  },
};

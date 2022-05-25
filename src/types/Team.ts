export interface Team {
  name: string;
  teamDescription: string;
}

export interface TeamMember {
  id: string;
  emailAddress: string;
  teamId: string;
}

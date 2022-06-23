import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  Box,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InfoIcon from "@material-ui/icons/Info";

import { Button, Card, Loader, ModalComponent } from "../../components";
import AdminAccessModal from "../../components/modals/AdminAccessModal";
import AddTeamMemberModal from "../../components/modals/AddTeamMemberModal";
import DeleteRitualModal from "../../components/modals/DeleteRitualModal";
import EditTeamInfoModal from "../../components/modals/EditTeamInfoModal";
import RemoveTeamMemberModal from "../../components/modals/RemoveTeamMemberModal";
import RitualComponent from "../../components/RitualComponent";
import Avatar from "../../components/svg/Avatar";
import RemoveUser from "../../components/svg/RemoveUser";
import { Menus } from "../../constants/menus";
import { Modals } from "../../constants/modals";
import {
  createTeamMember,
  deleteRitual,
  deleteTeamMember,
  editTeam,
  getRituals,
  getTeamMembers,
  ToggleUserAdminAccess,
} from "../../store/actions/actions";
import { colors } from "../../styling/styles/colors";
import appTheme from "../../styling/theme";
import { Ritual } from "../../types/Ritual";
import { TeamPageTestId } from "../../test/constants/teamPageTestId";
import AddRitualModal from "../../components/modals/AddRitualModal";
import { LightTooltip } from "../../components/LightTooltip";
import { TeamMember } from "../../types/Team";
import { features } from "../../services/features";
import { FeatureFlags } from "../../types/FeatureFlags";
import { SHOW_TEAM_MEMBERS_ON_TEAM_RITUAL_PAGE } from "../../constants/features";

interface ParamTypes {
  companyId: string;
  teamId: string;
}

const RootDiv = styled.div`
  width: 60vw;
`;

const ButtonDiv = styled.div`
  display: flex;
  margin: 1em 0;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(3),
  },
  buttonMore: {
    backgroundColor: "transparent",
    color: colors.groovBlue[100],
    padding: theme.spacing(4),
    "&:hover": {
      background: colors.royalBlueHover,
    },
  },
  description: { marginBottom: theme.spacing(6) },
  descriptionWithLink: {
    display: "flex",
    alignItems: "flex-start",
  },
  link: {
    padding: 0,
    margin: 0,
    color: colors.groovBlue[100],
  },
  downloadAction: {
    color: colors.groovBlue[100],
    fontWeight: 500,
  },
  listContainer: {
    padding: theme.spacing(4, 0),
    borderRadius: theme.spacing(3),
    backgroundColor: colors.whisperWhite,
    marginTop: theme.spacing(2),
  },
  listRightWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  listTitle: {
    color: colors.darkGrey,
    marginLeft: theme.spacing(4),
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  editIcon: {
    display: "flex",
    justifyContent: "center",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
  },
  listHeading: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3, 4),
    marginTop: theme.spacing(4),
  },
  footer: {
    margin: theme.spacing(6, 0),
  },
  centerVertical: { display: "flex", alignItems: "center" },
  iconWrapper: { display: "flex", justifyContent: "center" },
  iconButtonWrapper: {
    width: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalLabel: {
    marginTop: theme.spacing(3),
    textAlign: "left",
  },
  tooltip: {
    color: colors.silverSand,
    marginLeft: appTheme.spacing(3),
  },
  menu: {
    color: "black",
  },
}));

const Rituals = (props: any): JSX.Element => {
  const search = props.location.search;
  const params = new URLSearchParams(search);
  const modal = params.get("modal") || "";
  const ritualId = params.get("ritualId") || "";

  const [helpModal, setHelpModal] = useState(false);
  const [menuAnchors, setAnchors] = useState<{ [menuName: string]: any }>({});
  const [openModals, setOpenModals] = useState<{
    [modalName: string]: boolean;
  }>({ [modal]: !!modal });
  const [memberHover, setMemberHover] = useState<string | null>(null);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyId, teamId } = useParams<ParamTypes>();

  const rituals = useSelector((state: RootStateOrAny) => state.rituals);
  const [teamMemberToRemove, setTeamMemberToRemove] =
    useState<TeamMember | null>(null);
  const [selectedRitualId, setSelectedRitualId] = useState(ritualId);
  const hasAdminAccess = useSelector(
    (state: RootStateOrAny) => state.access.admin
  );
  const userEmailAddress = useSelector(
    (state: RootStateOrAny) => state.access.emailAddress
  );

  useEffect(() => {
    const oldTeamId = rituals?.data?.id;
    if (oldTeamId !== teamId) {
      dispatch(ToggleUserAdminAccess(false, ""));
    }
  }, [teamId, dispatch]);

  useEffect(() => {
    dispatch(getRituals(teamId));
    dispatch(getTeamMembers(teamId));
  }, []);

  const saveTeamInfo = (teamName: string, teamDescription: string): void => {
    dispatch(
      editTeam(teamId, {
        name: teamName,
        teamDescription: teamDescription,
      })
    );

    toggleModalOpen(Menus.TEAM_INFO, false);
  };

  const onEditRitualClick = (_: any): void => {
    if (!selectedRitualId) return;
    toggleContextMenuOpen(null, Menus.RITUALS, false);
    toggleModalOpen(Modals.EDIT_RITUAL, true);
  };

  const onCreateRitualClick = (): void => {
    if (hasAdminAccess) {
      setSelectedRitualId("");
      toggleModalOpen(Modals.EDIT_RITUAL, true);
      return;
    }

    toggleModalOpen(Modals.ADMIN_ACCESS, true);
  };

  const handleDelete = () => {
    dispatch(deleteRitual(selectedRitualId));
    toggleModalOpen(Modals.DELETE_RITUAL, false);
  };

  const handleAddTeamMembers = (emailAddresses: string[]) => {
    const newTeamMembers = emailAddresses.map((e) => {
      return {
        emailAddress: e,
      };
    });

    dispatch(
      createTeamMember(teamId, {
        teamMembers: newTeamMembers,
        addedBy: userEmailAddress,
      })
    );
  };

  const handleRemoveTeamMember = (memberId: string) => {
    dispatch(deleteTeamMember(teamId, memberId));
  };

  const toggleContextMenuOpen = (
    event: any,
    menuName: string,
    open: boolean
  ) => {
    if (hasAdminAccess) {
      setAnchors((prevState) => ({
        ...prevState,
        [menuName]: open ? event.currentTarget : null,
      }));
      return;
    }

    toggleModalOpen(Modals.ADMIN_ACCESS, true);
  };

  const toggleModalOpen = (modalName: string, open: boolean): void => {
    setOpenModals((prevState) => ({
      ...prevState,
      [modalName]: open,
    }));

    if (open) {
      let modalRoute = `?modal=${modalName}`;
      if (selectedRitualId) {
        modalRoute = `${modalRoute}&ritualId=${selectedRitualId}`;
      }
      history.push(modalRoute, {
        from: "rituals",
      });
    } else {
      history.push(`/${companyId}/${teamId}/rituals`);
    }
  };

  const handleAddMemberClick = (event: any) => {
    toggleContextMenuOpen(event, Menus.MEMBERS, false);
    toggleModalOpen(Menus.MEMBERS, true);
  };

  const handleEditTeamInfoClick = ($event: any) => {
    toggleContextMenuOpen($event, Menus.TEAM_INFO, false);
    toggleModalOpen(Menus.TEAM_INFO, true);
  };

  const handleRemoveMemberClick = (teamMember: TeamMember) => {
    setTeamMemberToRemove(teamMember);
    toggleModalOpen(Modals.REMOVE_MEMBER, true);
  };

  const renderListItem = (ritual: Ritual, index: number) => {
    return (
      <Grid item xs={6} key={"rt" + index}>
        <RitualComponent
          ritual={ritual}
          anchor={menuAnchors[Menus.RITUALS]}
          showContextMenu
          onCloseMenu={(e) => toggleContextMenuOpen(e, Menus.RITUALS, false)}
          onContextMenuClick={(e, r) => {
            toggleContextMenuOpen(e, Menus.RITUALS, true);
            setSelectedRitualId(r.id);
          }}
          onEditRitualClick={onEditRitualClick}
          onRemoveRitualClick={(e) => {
            toggleContextMenuOpen(e, Menus.RITUALS, false);
            toggleModalOpen(Modals.DELETE_RITUAL, true);
          }}
        />
      </Grid>
    );
  };

  return (
    <RootDiv>
      <Grid container spacing={3}>
        <Grid
          item
          xs={features[SHOW_TEAM_MEMBERS_ON_TEAM_RITUAL_PAGE] ? 8 : 12}
        >
          <Card>
            <CardHeader
              style={{ padding: 0 }}
              action={
                <>
                  <IconButton
                    data-testid={TeamPageTestId.EditTeamInfoMenuButton}
                    aria-label="menu"
                    onClick={(e) =>
                      toggleContextMenuOpen(e, Menus.TEAM_INFO, true)
                    }
                  >
                    <MoreVertIcon className={classes.menu} />
                  </IconButton>

                  <Menu
                    anchorEl={menuAnchors[Menus.TEAM_INFO]}
                    open={Boolean(menuAnchors[Menus.TEAM_INFO])}
                    onClose={(e) =>
                      toggleContextMenuOpen(e, Menus.TEAM_INFO, false)
                    }
                  >
                    <MenuItem
                      data-testid={TeamPageTestId.EditTeamInfoLink}
                      onClick={handleEditTeamInfoClick}
                    >
                      Edit team info
                    </MenuItem>
                  </Menu>
                </>
              }
              title={
                <Box>
                  <Box
                    data-testid={TeamPageTestId.TeamNameHeader}
                    className={classes.headerContainer}
                  >
                    <Typography variant="h2">{rituals?.data?.name}</Typography>
                    <LightTooltip
                      title="This is where you can record the rituals for your team. 
These can be viewed by the rest of the organisation, inspiring them to create ones of their own. Science also shows that recording and sharing commitments will help to make them stick.
"
                      placement="top"
                    >
                      <InfoIcon className={classes.tooltip} />
                    </LightTooltip>
                  </Box>
                  <Typography
                    variant="body1"
                    style={{ marginTop: appTheme.spacing(3) }}
                  >
                    {rituals?.data?.teamDescription}
                  </Typography>
                </Box>
              }
            />
            <ButtonDiv>
              <Button
                variant="contained"
                className={classes.button}
                onClick={onCreateRitualClick}
              >
                <Box data-testid={TeamPageTestId.CreateANewRitualButton}>
                  Create a new ritual
                </Box>
              </Button>
              <Button
                className={classes.buttonMore}
                variant="contained"
                onClick={() => setHelpModal(true)}
              >
                <Box className={classes.iconButtonWrapper}>
                  <HelpOutlineIcon color={"primary"} />
                  <Typography variant="h5" className={classes.link}>
                    More
                  </Typography>
                </Box>
              </Button>
            </ButtonDiv>

            <Grid container spacing={2}>
              {rituals.data &&
              rituals.data.rituals &&
              rituals.data.rituals.length > 0 ? (
                <Grid container spacing={10}>
                  {rituals?.data?.rituals
                    .sort(
                      (a: Ritual, b: Ritual) =>
                        new Date(b.lastUpdateTime).getTime() -
                        new Date(a.lastUpdateTime).getTime()
                    )
                    .map((ritual: any, index: number) => {
                      return renderListItem(ritual, index);
                    })}
                </Grid>
              ) : (
                <>
                  {rituals.loading ? (
                    <Box p={10} display="flex" justifyContent="center">
                      <Loader
                        color={colors.royalBlue}
                        size={50}
                        thickness={4}
                      />
                    </Box>
                  ) : (
                    <Box p={10}>
                      <Typography variant="h3" align="center">
                        No data
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Card>
        </Grid>
        {features[SHOW_TEAM_MEMBERS_ON_TEAM_RITUAL_PAGE] && (
          <Grid item xs={4}>
            <Card>
              <CardHeader
                style={{ padding: 0 }}
                action={
                  <div>
                    <IconButton
                      data-testid={TeamPageTestId.EditTeamMemberMenuButton}
                      onClick={(e) =>
                        toggleContextMenuOpen(e, Menus.MEMBERS, true)
                      }
                    >
                      <MoreVertIcon className={classes.menu} />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={menuAnchors[Menus.MEMBERS]}
                      open={Boolean(menuAnchors[Menus.MEMBERS])}
                      onClose={(e) =>
                        toggleContextMenuOpen(e, Menus.MEMBERS, false)
                      }
                    >
                      <MenuItem
                        data-testid={TeamPageTestId.AddTeamMemberLink}
                        onClick={handleAddMemberClick}
                      >
                        {"Add team member"}
                      </MenuItem>
                    </Menu>
                  </div>
                }
                title={
                  <Typography variant="h2" gutterBottom>
                    Members
                  </Typography>
                }
              />
              <Box>
                {rituals?.data?.teamMembers &&
                  rituals?.data?.teamMembers.map((teamMember: TeamMember) => {
                    const memberName = hasAdminAccess
                      ? teamMember.emailAddress
                      : "******";
                    return (
                      <Grid
                        container
                        key={teamMember.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: appTheme.spacing(3),
                        }}
                        onMouseOver={() =>
                          setMemberHover(teamMember.emailAddress)
                        }
                        onMouseOut={() => setMemberHover(null)}
                      >
                        <Grid
                          item
                          xs={2}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Avatar />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography
                            variant="body1"
                            style={{
                              marginLeft: appTheme.spacing(4),
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              paddingRight: "5px",
                            }}
                          >
                            {memberName}
                          </Typography>
                        </Grid>
                        <Grid xs={1}>
                          <IconButton
                            onClick={() => handleRemoveMemberClick(teamMember)}
                            style={{
                              marginLeft: "auto",
                              padding: 0,
                              visibility:
                                hasAdminAccess &&
                                memberHover === teamMember.emailAddress
                                  ? "visible"
                                  : "hidden",
                            }}
                          >
                            <RemoveUser />
                          </IconButton>
                        </Grid>
                      </Grid>
                    );
                  })}
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>
      <ModalComponent
        open={helpModal}
        icon={true}
        title="Create new ritual"
        message="Let your team agree on rituals which you want to do regularly. You can update, delete or create a new one depending on what works for your team."
        buttonTitle="Close"
        onClose={() => setHelpModal(false)}
      />

      <DeleteRitualModal
        ritualId={selectedRitualId}
        open={Boolean(openModals[Modals.DELETE_RITUAL])}
        onClose={() => toggleModalOpen(Modals.DELETE_RITUAL, false)}
        handleDelete={handleDelete}
      />

      <AddTeamMemberModal
        open={Boolean(openModals[Menus.MEMBERS])}
        onClose={() => toggleModalOpen(Modals.MEMBERS, false)}
        handleAddTeamMember={handleAddTeamMembers}
      />

      <EditTeamInfoModal
        open={Boolean(openModals[Menus.TEAM_INFO])}
        teamName={rituals?.data?.name}
        teamDescription={rituals?.data?.teamDescription}
        onClose={() => toggleModalOpen(Menus.TEAM_INFO, false)}
        saveTeamInfo={saveTeamInfo}
      />

      {teamMemberToRemove && (
        <RemoveTeamMemberModal
          teamMember={teamMemberToRemove}
          open={Boolean(openModals[Modals.REMOVE_MEMBER])}
          onClose={() => toggleModalOpen(Modals.REMOVE_MEMBER, false)}
          handleRemoveTeamMember={handleRemoveTeamMember}
        />
      )}

      <AddRitualModal
        open={Boolean(openModals[Modals.EDIT_RITUAL])}
        ritualId={selectedRitualId}
        teamId={teamId}
        onClose={() => {
          toggleModalOpen(Modals.EDIT_RITUAL, false);
        }}
      />

      <AdminAccessModal
        open={Boolean(openModals[Modals.ADMIN_ACCESS])}
        onClose={() => toggleModalOpen(Modals.ADMIN_ACCESS, false)}
        teamId={rituals?.data?.id}
      />
    </RootDiv>
  );
};

export default Rituals;

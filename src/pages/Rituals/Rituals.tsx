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

import { Button, Card, Loader, ModalComponent } from "../../components";
import AddTeamMemberModal from "../../components/modals/AddTeamMemberModal";
import DeleteRitualModal from "../../components/modals/DeleteRitualModal";
import EditTeamInfoModal from "../../components/modals/EditTeamInfoModal";
import RemoveTeamMemberModal from "../../components/modals/RemoveTeamMemberModal";
import RitualComponent from "../../components/RitualComponent";
import Avatar from "../../components/svg/Avatar";
import RemoveUser from "../../components/svg/RemoveUser";
import { FeatureFlag } from "../../constants/featureFlags";
import { Menus } from "../../constants/menus";
import { Modals } from "../../constants/modals";
import {
  deleteRitual,
  editTeam,
  getRituals,
} from "../../store/actions/actions";
import { colors } from "../../styling/styles/colors";
import appTheme from "../../styling/theme";
import { Ritual } from "../../types/Ritual";

interface ParamTypes {
  companyId: string;
  teamId: string;
}

const RootDiv = styled.div`
  width: 60vw;
`;

const ButtonDiv = styled.div`
  display: flex;
  margin: 2em 0;
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
  cardHeader: {
    marginBottom: theme.spacing(4),
    justifyContent: "space-between",
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
}));

const Rituals = () => {
  const [helpModal, setHelpModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [menuAnchors, setAnchors] = useState<{ [menuName: string]: any }>({});
  const [openModals, setOpenModals] = useState<{
    [modalName: string]: boolean;
  }>({});
  const [memberHover, setMemberHover] = useState<string | null>(null);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyId, teamId } = useParams<ParamTypes>();

  const rituals = useSelector((state: RootStateOrAny) => state.rituals);
  const [teamMemberToRemove, setTeamMemberToRemove] = useState("");

  useEffect(() => {
    dispatch(getRituals(teamId));
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

  const handleDelete = () => {
    dispatch(deleteRitual(deleteId));
    toggleModalOpen(Modals.DELETE_RITUAL, false);
  };

  const toggleContextMenuOpen = (
    event: any,
    menuName: string,
    open: boolean
  ) => {
    setAnchors((prevState) => ({
      ...prevState,
      [menuName]: open ? event.currentTarget : null,
    }));
  };

  const toggleModalOpen = (modalName: string, open: boolean): void => {
    setOpenModals((prevState) => ({
      ...prevState,
      [modalName]: open,
    }));
  };

  const handleAddMemberClick = (event: any) => {
    toggleContextMenuOpen(event, Menus.MEMBERS, false);
    toggleModalOpen(Menus.MEMBERS, true);
  };

  const handleEditTeamInfoClick = ($event: any) => {
    toggleContextMenuOpen($event, Menus.TEAM_INFO, false);
    toggleModalOpen(Menus.TEAM_INFO, true);
  };

  const handleRemoveMemberClick = (teamMember: string) => {
    setTeamMemberToRemove(teamMember);
    toggleModalOpen(Modals.REMOVE_MEMBER, true);
  };

  const renderListItem = (ritual: Ritual, index: number) => {
    return (
      <Grid item xs={6} key={"rt" + index}>
        <RitualComponent
          ritual={ritual}
          companyId={companyId}
          anchor={menuAnchors[Menus.RITUALS]}
          showContextMenu
          onCloseMenu={(e) => toggleContextMenuOpen(e, Menus.RITUALS, false)}
          onContextMenuClick={(e) =>
            toggleContextMenuOpen(e, Menus.RITUALS, true)
          }
          onRemoveRitualClick={(e) => {
            setDeleteId(ritual.id);
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
        <Grid item xs={12}>
          <Card>
            <CardHeader
              style={{ padding: 0 }}
              action={
                <>
                  <IconButton
                    aria-label="menu"
                    onClick={(e) =>
                      toggleContextMenuOpen(e, Menus.TEAM_INFO, true)
                    }
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    anchorEl={menuAnchors[Menus.TEAM_INFO]}
                    open={Boolean(menuAnchors[Menus.TEAM_INFO])}
                    onClose={(e) =>
                      toggleContextMenuOpen(e, Menus.TEAM_INFO, true)
                    }
                  >
                    <MenuItem onClick={handleEditTeamInfoClick}>
                      Edit team info
                    </MenuItem>
                  </Menu>
                </>
              }
              title={
                <>
                  <Typography variant="h2" gutterBottom>
                    {rituals?.data?.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {rituals?.data?.teamDescription}
                  </Typography>
                </>
              }
            />
            <ButtonDiv>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() =>
                  history.push(`/${companyId}/${teamId}/ritual/add`)
                }
              >
                Create a new ritual
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

            <Grid container direction="row" className={classes.cardHeader}>
              <Typography variant="h2" gutterBottom>
                Commited rituals
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {rituals.data &&
              rituals.data.rituals &&
              rituals.data.rituals.length > 0 ? (
                <Grid container spacing={10}>
                  {rituals?.data?.rituals.map((ritual: any, index: number) => {
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
        {FeatureFlag.renderMembers && (
          <Grid item xs={4}>
            <Card>
              <CardHeader
                style={{ padding: 0 }}
                action={
                  <div>
                    <IconButton
                      onClick={(e) =>
                        toggleContextMenuOpen(e, Menus.MEMBERS, true)
                      }
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={menuAnchors[Menus.MEMBERS]}
                      open={Boolean(menuAnchors[Menus.MEMBERS])}
                      onClose={(e) =>
                        toggleContextMenuOpen(e, Menus.MEMBERS, false)
                      }
                    >
                      <MenuItem onClick={handleAddMemberClick}>
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
                {[].map((teamMember) => {
                  return (
                    <Box
                      key={teamMember}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: appTheme.spacing(3),
                      }}
                      onMouseOver={() => setMemberHover(teamMember)}
                      onMouseOut={() => setMemberHover(null)}
                    >
                      <Avatar color={teamMember} />
                      <Typography
                        variant="body1"
                        style={{ marginLeft: appTheme.spacing(4) }}
                      >
                        {teamMember}
                      </Typography>
                      <IconButton
                        onClick={() => handleRemoveMemberClick(teamMember)}
                        style={{
                          marginLeft: "auto",
                          padding: 0,
                          visibility:
                            memberHover === teamMember ? "visible" : "hidden",
                        }}
                      >
                        <RemoveUser />
                      </IconButton>
                    </Box>
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
        message="Let your team agree on rituals which you want to do regularly. You can update, delete or create a new one depend on what works for your team."
        buttonTitle="Close"
        onClose={() => setHelpModal(false)}
      />

      <DeleteRitualModal
        ritual={rituals?.data?.rituals?.find((r: Ritual) => r.id === deleteId)}
        companyId={companyId}
        open={openModals[Modals.DELETE_RITUAL]}
        onClose={() => toggleModalOpen(Modals.DELETE_RITUAL, false)}
        handleDelete={handleDelete}
      />

      <AddTeamMemberModal
        open={openModals[Menus.MEMBERS]}
        onClose={() => toggleModalOpen(Modals.MEMBERS, false)}
      />

      <EditTeamInfoModal
        open={openModals[Menus.TEAM_INFO]}
        teamName={rituals?.data?.name}
        teamDescription={rituals?.data?.teamDescription}
        onClose={() => toggleModalOpen(Menus.TEAM_INFO, false)}
        saveTeamInfo={saveTeamInfo}
      />

      <RemoveTeamMemberModal
        teamMemberEmailAddress={teamMemberToRemove}
        open={openModals[Modals.REMOVE_MEMBER]}
        onClose={() => toggleModalOpen(Modals.REMOVE_MEMBER, false)}
      />
    </RootDiv>
  );
};

export default Rituals;

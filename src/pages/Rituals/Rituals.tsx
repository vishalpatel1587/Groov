import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Backdrop,
  Box,
  CardContent,
  CardHeader,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as NavLink } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { deleteRitual, getRituals } from "../../store/actions/actions";

import {
  Loader,
  Card,
  Button,
  ModalComponent,
  Link,
  Input,
} from "../../components";
import { colors } from "../../styling/styles/colors";
import theme from "../../styling/theme";
import { formatDate } from "../../utils/dateUtils";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AccountCircle } from "@material-ui/icons";
import BasicModal from "../../components/BasicModal";

interface ParamTypes {
  companyId: string;
  teamId: string;
}

interface Props {}
const RootDiv = styled.div`
  margin: 0 15%;
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
  cardHeader: { marginBottom: theme.spacing(4) },
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
}));

const Rituals = (props: Props) => {
  const [helpModal, setHelpModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [membersAnchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [teamAnchorEl, setTeamAnchorEl] = useState(null);
  const [ritualAnchorEl, setRitualAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [memberHover, setMemberHover] = useState<string | null>(null);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { companyId, teamId } = useParams<ParamTypes>();

  const rituals = useSelector((state: RootStateOrAny) => state.rituals);

  useEffect(() => {
    dispatch(getRituals(teamId));
  }, []);

  const handleDelete = () => {
    dispatch(deleteRitual(deleteId));
    setDeleteModal(false);
  };

  const handleMembersContextMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMemberContextMenuClick = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleTeamContextMenuClick = (event: any) => {
    setTeamAnchorEl(event.currentTarget);
  };

  const handleRitualContextMenuClick = (event: any) => {
    setRitualAnchorEl(event.currentTarget);
  };

  const handleAddMemberClick = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleTeamContextMenu = () => {
    setTeamAnchorEl(null);
  };

  const handleCloseRitualContextMenu = () => {
    setRitualAnchorEl(null);
  };

  const handleCloseAddMemberModal = () => {
    setOpen(false);
  };

  const Person = () => {
    return (
      <svg
        width="22"
        height="19"
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.5514 11.8182C18.1295 11.8182 19.8069 12.9008 20.6087 14.6801C20.9851 15.5153 21.1168 16.3602 21.1084 17.0995L21.092 17.4619C21.0377 18.0115 20.5482 18.4131 19.9985 18.3588C19.4882 18.3084 19.1055 17.8827 19.0969 17.3821L19.1034 17.2351C19.1303 16.7323 19.0512 16.0919 18.7852 15.5017C18.3296 14.4906 17.4339 13.8784 15.8017 13.8224L15.5514 13.8182H6.45477C4.66039 13.8182 3.69652 14.44 3.21896 15.5013C2.98701 16.0167 2.8978 16.5708 2.89737 17.0383L2.90423 17.2602C2.95931 17.8137 2.55836 18.3037 2.00882 18.3587C1.49853 18.4097 1.03954 18.0676 0.932576 17.5785L0.910661 17.4217C0.909552 17.4065 0.908167 17.3847 0.905399 17.3412C0.862382 16.547 0.977892 15.6077 1.39512 14.6805C2.16631 12.9668 3.75104 11.8993 6.17175 11.8226L6.45477 11.8182H15.5514ZM11.0002 0C14.0629 0 16.5457 2.48278 16.5457 5.54545C16.5457 8.60812 14.0629 11.0909 11.0002 11.0909C7.93755 11.0909 5.45477 8.60812 5.45477 5.54545C5.45477 2.48278 7.93755 0 11.0002 0ZM11.0002 2C9.04212 2 7.45477 3.58735 7.45477 5.54545C7.45477 7.50356 9.04212 9.09091 11.0002 9.09091C12.9583 9.09091 14.5457 7.50356 14.5457 5.54545C14.5457 3.58735 12.9583 2 11.0002 2Z"
          fill="#A5ABB7"
        />
      </svg>
    );
  };
  const Avator = ({ color }: any) => {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="23.5" fill="white" stroke="#E6EBF3" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.7432 9.00591C25.7682 8.91121 29.6982 9.9503 32.8304 12.4799C36.357 15.328 39.2292 19.0668 39.7731 23.5671C40.3828 28.6112 39.9764 34.6986 35.8789 37.7027C31.9202 40.6051 26.6305 37.2435 21.7432 36.786C17.668 36.4046 12.9411 38.1575 10.0275 35.2828C7.10807 32.4022 8.13686 27.6631 8.346 23.5671C8.53943 19.7787 8.59738 15.7812 11.1658 12.9896C13.8177 10.1073 17.8277 9.09803 21.7432 9.00591Z"
          fill={color}
          stroke="black"
        />
      </svg>
    );
  };
  const renderListItem = (
    { id, action, trigger, checkinFrequency, teamId, lastUpdateTime }: any,
    index: number
  ) => {
    return (
      <Grid item xs={6} key={"rt" + index}>
        <Card
          style={{
            backgroundColor: "#F8FCFF",
            borderRadius: theme.spacing(3),
            padding: theme.spacing(4),
          }}
        >
          <CardHeader
            title={<Typography variant="h5">{trigger}</Typography>}
            action={
              <>
                <IconButton
                  aria-label="settings"
                  onClick={handleRitualContextMenuClick}
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id="simple-menu"
                  anchorEl={ritualAnchorEl}
                  keepMounted
                  open={Boolean(ritualAnchorEl)}
                  onClose={handleCloseRitualContextMenu}
                >
                  <MenuItem
                    onClick={() => {
                      history.push({
                        pathname: `/${companyId}/ritual/edit/${id}`,
                        state: {
                          id,
                          action,
                          trigger,
                          checkinFrequency,
                          teamId,
                        },
                      });
                    }}
                  >
                    Edit ritual
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      // move to method ?
                      setDeleteId(id);
                      setDeleteModal(true);
                    }}
                  >
                    Remove ritual
                  </MenuItem>
                </Menu>
              </>
            }
            style={{ padding: 0 }}
          />

          <Typography variant="body1" style={{ marginTop: theme.spacing(3) }}>
            {action}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ marginTop: theme.spacing(6) }}
          >
            Checkin frequency: {checkinFrequency}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ marginTop: theme.spacing(2) }}
          >
            Last updated: {formatDate(lastUpdateTime)}
          </Typography>
        </Card>
      </Grid>
    );
  };
  return (
    <RootDiv>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Card>
            <CardHeader
              style={{ padding: 0 }}
              action={
                <>
                  <IconButton
                    aria-label="settings"
                    onClick={handleTeamContextMenuClick}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={teamAnchorEl}
                    keepMounted
                    open={Boolean(teamAnchorEl)}
                    onClose={handleTeamContextMenu}
                  >
                    <MenuItem>Edit team info</MenuItem>
                  </Menu>
                </>
              }
              title={
                <Typography variant="h2" gutterBottom>
                  {rituals?.data?.name}
                </Typography>
              }
            />
            <Typography
              variant="body1"
              gutterBottom
              className={classes.description}
            >
              This is where you can record the rituals for your team. These can
              be viewed by the rest of the organisation, inspiring them to
              create ones of their own. Science also shows that recording and
              sharing commitments will help to make them stick.
            </Typography>
            <Box className={classes.descriptionWithLink}>
              <Link href={`/${companyId}/ideas`} className={classes.link}>
                <Typography variant="body1" className={classes.link}>
                  Click here
                </Typography>
              </Link>
              <Typography
                variant="body1"
                style={{
                  display: "inline-block",
                  marginLeft: theme.spacing(1),
                }}
              >
                to spark ideas about triggers and actions suitable for your
                team.
              </Typography>
            </Box>

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
                <Box
                  width={70}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HelpOutlineIcon color={"primary"} />
                  <Typography variant="h5" className={classes.link}>
                    More
                  </Typography>
                </Box>
              </Button>
            </ButtonDiv>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              className={classes.cardHeader}
            >
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
        <Grid item xs={4}>
          <Card>
            <CardHeader
              style={{ padding: 0 }}
              action={
                <div>
                  <IconButton onClick={handleMembersContextMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={membersAnchorEl}
                    keepMounted
                    open={Boolean(membersAnchorEl)}
                    onClose={handleAddMemberClick}
                  >
                    <MenuItem onClick={handleAddMemberClick}>
                      Add member
                    </MenuItem>
                  </Menu>
                  <BasicModal
                    title="Add member"
                    onClose={() => setOpen(false)}
                    open={open}
                    size="md"
                    primaryActionTitle="Create"
                    secondaryActionTitle="Cancel"
                  >
                    <>
                      <Input
                        fullWidth={true}
                        name="triggers"
                        type="email"
                        value={""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          console.log(e)
                        }
                        style={{ marginTop: theme.spacing(6) }}
                        placeholder="Email address"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Typography
                        style={{
                          marginTop: theme.spacing(3),
                          textAlign: "left",
                        }}
                      >
                        Use comma to seperate multiple email addresses
                      </Typography>
                    </>
                  </BasicModal>
                  {/* <Modal
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    open={open}
                    onClose={handleCloseAddMemberModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div
                        style={{
                          backgroundColor: theme.palette.background.paper,
                          border: "2px solid gray",
                          boxShadow: theme.shadows[5],
                          padding: theme.spacing(8, 9),
                          borderRadius: theme.spacing(4),
                          minWidth: "500px",
                        }}
                      >
                        <Typography variant="h2">Add member</Typography>
                        <Input
                          fullWidth={true}
                          name="triggers"
                          type="email"
                          value={""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            console.log(e)
                          }
                          style={{ marginTop: theme.spacing(6) }}
                          placeholder="Email address"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Typography style={{ marginTop: theme.spacing(3) }}>
                          Use comma to seperate multiple email addresses
                        </Typography>
                        <ButtonDiv
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <Button
                            variant="contained"
                            className={classes.button}
                            disabled
                          >
                            Continue
                          </Button>
                          <Button
                            className={classes.buttonMore}
                            variant="contained"
                          >
                            <Box
                              width={70}
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography variant="h5">Cancel</Typography>
                            </Box>
                          </Button>
                        </ButtonDiv>
                      </div>
                    </Fade>
                  </Modal> */}
                </div>
              }
              title={
                <Typography variant="h2" gutterBottom>
                  Members
                </Typography>
              }
            />
            <Box>
              {["#E8B186", "#AF9AFF", "#D2FDE6", "#99D0FF"].map(
                (teamMember) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: theme.spacing(3),
                      }}
                      onMouseOver={() => setMemberHover(teamMember)}
                      onMouseOut={() => setMemberHover(null)}
                    >
                      <Avator color={teamMember} />
                      <Typography
                        variant="body1"
                        style={{ marginLeft: theme.spacing(4) }}
                      >
                        Nickname
                      </Typography>
                      <IconButton
                        onClick={handleMemberContextMenuClick}
                        style={{
                          marginLeft: "auto",
                          padding: 0,
                          visibility:
                            memberHover === teamMember ? "visible" : "hidden",
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={Boolean(anchorEl2)}
                        onClose={handleClose2}
                      >
                        <MenuItem onClick={handleClose2}>
                          Remove member
                        </MenuItem>
                      </Menu>
                    </div>
                  );
                }
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
      <ModalComponent
        open={helpModal}
        icon={true}
        title="Create new ritual"
        message="Let your team agree on rituals which you want to do regularly. You can update, delete or create a new one depend on what works for your team."
        buttonTitle="Close"
        onClose={() => setHelpModal(false)}
      />

      <ModalComponent
        open={deleteModal}
        // open={true}
        icon={false}
        type="confirm"
        title="Do you really want to delete this ritual?"
        onClose={() => setDeleteModal(false)}
        yesClickTitle="Yes"
        noClickTitle="No"
        onYesClick={handleDelete}
        onNoClick={() => setDeleteModal(false)}
      />
    </RootDiv>
  );
};

export default Rituals;

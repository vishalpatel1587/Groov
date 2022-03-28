import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as NavLink } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { deleteRitual, getRituals } from "../../store/actions/actions";

import { Loader, Card, Button, ModalComponent, Link } from "../../components";
import { colors } from "../../styling/styles/colors";
import theme from "../../styling/theme";

interface ParamTypes {
  companyId: string;
  teamId: string;
}

interface Props {}
const RootDiv = styled.div`
  margin: 0 20%;
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
  const renderListItem = (
    { id, action, trigger, checkinFrequency, teamId }: any,
    index: number
  ) => {
    return (
      <Grid
        container
        item
        key={"rt" + index}
        className={classes.centerVertical}
      >
        <Grid container direction="row" item className={classes.listContainer}>
          <Grid item xs={3} className={classes.centerVertical}>
            <Typography variant="h4" className={classes.listTitle}>
              {checkinFrequency}
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.centerVertical}>
            <Typography variant="h4" className={classes.listTitle}>
              {trigger}
            </Typography>
          </Grid>
          <Grid container item xs={6} className={classes.centerVertical}>
            <Grid item xs={8}>
              <Typography variant="h4" className={classes.listTitle}>
                {action}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.editIcon}>
              <NavLink
                to={{
                  pathname: `/${companyId}/ritual/edit/${id}`,
                  state: { id, action, trigger, checkinFrequency, teamId },
                }}
              >
                <IconButton>
                  <CreateOutlinedIcon style={{ color: colors.royalBlue }} />
                </IconButton>
              </NavLink>
            </Grid>
            <Grid item xs={2} className={classes.iconWrapper}>
              <IconButton
                onClick={() => {
                  setDeleteId(id);
                  setDeleteModal(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  return (
    <RootDiv>
      <Card>
        <Typography variant="h2" gutterBottom>
          {rituals?.data?.name}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.description}
        >
          This is where you can record the rituals for your team. These can be
          viewed by the rest of the organisation, inspiring them to create ones
          of their own. Science also shows that recording and sharing
          commitments will help to make them stick.
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
            to spark ideas about triggers and actions suitable for your team.
          </Typography>
        </Box>

        <ButtonDiv>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => history.push(`/${companyId}/${teamId}/ritual/add`)}
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
        {rituals.data &&
        rituals.data.rituals &&
        rituals.data.rituals.length > 0 ? (
          <Grid container>
            <Grid item xs={3} className={classes.listHeading}>
              <Typography variant="h4">Check-in frequency</Typography>
            </Grid>
            <Grid item xs={3} className={classes.listHeading}>
              <Typography variant="h4">Triggers</Typography>
            </Grid>
            <Grid item xs={6} className={classes.listHeading}>
              <Typography variant="h4">Actions</Typography>
            </Grid>
            {rituals?.data?.rituals.map((items: any, index: number) =>
              renderListItem(items, index)
            )}
          </Grid>
        ) : (
          <>
            {rituals.loading ? (
              <Box p={10} display="flex" justifyContent="center">
                <Loader color={colors.royalBlue} size={50} thickness={4} />
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
      </Card>

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

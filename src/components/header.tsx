import logo from "../assets/groov_logo.png";
import styled from "styled-components";
import { RootStateOrAny, useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";
import { colors } from "../styling/styles/colors";

const useStyles = makeStyles((theme) => ({
  companyName: {
    color: colors.grey[40],
    marginLeft: theme.spacing(4),
  },
}));

const RootDiv = styled.div`
  padding: 10px 20px 40px 20px;
`;

const Header = () => {
  const classes = useStyles();
  const company = useSelector((state: RootStateOrAny) => state.company);

  return (
    <RootDiv>
      <img width={"124px"} src={logo} alt={"logo"}></img>
      <Typography variant="h5" className={classes.companyName}>
        {company?.name || ""}
      </Typography>
    </RootDiv>
  );
};

export default Header;

import styled from "styled-components";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { RootStateOrAny, useSelector } from "react-redux";

import { Card } from "../../components";
import { ritualsIdeas } from "../../utils/data";

interface Props {}

const RootDiv = styled.div`
  padding-bottom: 30px;
  max-width: 900px;
`;

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(10, 0),
  },
  rowList: { marginBottom: theme.spacing(6) },
}));

const Ideas = (props: Props) => {
  const classes = useStyles();
  const company = useSelector((state: RootStateOrAny) => state.company);

  return (
    <RootDiv>
      <Typography variant="h1" gutterBottom className={classes.title}>
        Ideas for team rituals
        {/* at {company.name} */}
      </Typography>
      <Card>
        {ritualsIdeas.map(({ id, trigger, action }) => {
          return (
            <Grid container className={classes.rowList} key={id}>
              <Grid item>
                <Box px={4}>
                  <Typography variant="h3">{`${id})`}</Typography>
                </Box>
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h3" gutterBottom>
                  Trigger: {trigger}
                </Typography>

                {action.map((item, index) => {
                  return (
                    <Typography variant="body1" gutterBottom key={index}>
                      Action: {item}
                    </Typography>
                  );
                })}
              </Grid>
            </Grid>
          );
        })}
      </Card>
    </RootDiv>
  );
};

export default Ideas;

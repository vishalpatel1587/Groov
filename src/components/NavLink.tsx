import React from 'react';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {NavLink as RCTNavLink, NavLinkProps, useRouteMatch} from 'react-router-dom';
import { colors } from '../styling/styles/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        routeText: {
            color: colors.slateGrey,
            fontSize: 16,
            marginBottom: 4,
            marginLeft: 0,
            padding: 0,
            fontWeight: 'bold',
            height: 20,
            letterSpacing: 0,
            textDecoration: 'none',
            paddingRight: 32,
            textTransform: 'none'
        },
        activeRouteText: {
            color: colors.darkGrey,
        },
        underline: {
            width: 34,
            height: 2,
            backgroundColor: colors.blue,
            borderRadius: 1,
        },
    }),
);

export const NavLink = (props: NavLinkProps) => {
    const classes = useStyles(props);
    let match = useRouteMatch(props.to as string);

    return (
        <div>
            <RCTNavLink {...props} activeClassName={classes.activeRouteText} className={classes.routeText} />
            {match && <div className={classes.underline} />}
        </div>
    );
};

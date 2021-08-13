import { colors } from '../../styling/styles/colors';

export const toasterStyles = {
  snackbar: {
    height: 80,
    width: 510,
    background: 'rgb(255, 255, 255)',
    boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0,
    fontFamily: ['Averta', 'Helvetica', 'Verdana', 'sans-serif'].join(','),
    color: colors.darkGrey
  },
  description: {
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: ['Averta', 'Helvetica', 'Verdana', 'sans-serif'].join(','),
    color: colors.slateGrey2
  },
  iconGrid: {
    display: 'flex',
    marginLeft: 14,
    marginRight: 14
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center'
  },
  close: { margin: 16 }
};

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles, styled } from "@material-ui/core/styles";

interface TabBarProps {
  className?: string;
  tabs: any;
  handleChange: (event: any, newValue: number) => void;
  selectedTab: number;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
const StyledTabs = styled((props: any) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
  "& .MuiTab-root": {
    minWidth: 50,
    padding: 0,
    marginRight: 15,
  },
});
const CustomTab = withStyles({
  root: {
    textTransform: "none",
    fontFamily: "Averta",
  },
})(Tab);

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  selectedTab,
  handleChange,
  className,
}) => {
  return (
    <StyledTabs
      className={className}
      value={selectedTab}
      onChange={handleChange}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    >
      {tabs.map((tab: string, index: number) => {
        return <CustomTab key="tab" label={tab} {...a11yProps(index)} />;
      })}
    </StyledTabs>
  );
};
export { TabBar };

import { Avatar, Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useSessionContext } from "../../components/Authentication/SessionContext";
import Widget from "../../components/Widget";
import Articles from "../ContentList/Articles/Articles";
import Games from "../ContentList/Games/Games";
import Reviews from "../ContentList/Reviews/Reviews";

const NGINX_URL = process.env.REACT_APP_NGINX_USER;

export default function UserContent() {
  const {
    session: { user },
  } = useSessionContext();
  const [tab, setTab] = useState<number>(0);
  const { userName } = useParams();
  let edit = userName === user?.username;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <Box sx={{ mt: 6 }}>
      <Container maxWidth="xl">
        <Widget noPadding sx={{ backgroundColor: "primary.main", pt: 4, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 4 }}>
            <Avatar
              alt={user?.username}
              src={`${NGINX_URL}/${user?.profilePicturePath}/profile.png`}
              sx={{ mr: 3, width: 72, height: 72 }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h4">{user?.username}</Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="basic tabs example"
            >
              <Tab label="Artykuły" {...a11yProps(0)} />
              <Tab label="Recenzje" {...a11yProps(1)} />
              <Tab label="Gry" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </Widget>
      </Container>
      <TabPanel value={tab} index={0}>
        <Articles edit={edit} userName={userName} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Reviews edit={edit} userName={userName} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Games edit={edit} userName={userName} />
      </TabPanel>
    </Box>
  );
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ mt: -1 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 4 }}>{children}</Box>}
    </Box>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

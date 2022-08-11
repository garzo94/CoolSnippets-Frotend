import React, { useEffect } from "react";
import Filters from "./Filters";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import { theme } from "../../styles/createTheme";
import { ButtonCustomized } from "../../styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import CardNote from "./Card";
import useRequestResource from "../hooks/useRequestResource";
import useText from "./CreateNote/Context";

export default function Dashboard() {
  const { query, programingLang } = useText();
  const {
    resourceList,
    getResourceList,
    deleteResource,
    getResource,
    resource,
  } = useRequestResource({});
  const { id } = useParams();

  useEffect(() => {
    getResourceList({ query: query });
  }, [query]);

  useEffect(() => {
    if (id) {
      getResource(id);
    }
  }, [id, getResource]);

  const handleDelete = (key) => {
    deleteResource(key);
  };
  return (
    <div style={{ padding: 2, position: "relative" }}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            position: "absolute",
            width: { lg: 1000, md: 1200, sm: 900, xs: 600 },
            height: { lg: 800, md: 700, sm: 600, xs: 500 },
            borderRadius: "48% 52% 29% 71% / 38% 2% 98% 62% ",
            background: "linear-gradient(0.50turn,#290066,#19334d)",
            top: { lg: "-15rem", md: "-10rem", sm: "-8rem", xs: "-5rem" },
            left: { lg: "30rem", md: "0.5rem", sm: "-2rem", xs: "-2rem" },
            overflow: "hidden",
          }}
        ></Box>

        <Filters />
        <Typography
          variant="h5"
          sx={{
            color: `${theme.palette.secondary.main}`,
            fontFamily: "Nanum Gothic Coding",
            mt: 2,
            fontSize: { lg: 30, md: 25, sm: 22, xs: 18 },
            fontWeight: { lg: "900", md: "600", sm: "500", xs: "400" },
            color: {
              xl: theme.palette.secondary.main,
              lg: theme.palette.secondary.main,
              md: "#fff",
              sm: "#fff",
              xs: "#fff",
            },
            ml: 5,
            position: "relative",
            zIndex: "mobileStepper",
          }}
        >
          Your Snippets of{" "}
          {programingLang !== "" ? programingLang + ":" : "..."}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
            mt: 3,
            mr: 5,
          }}
        >
          <ButtonCustomized
            component={Link}
            variant="contained"
            to="/create-note"
            sx={{ borderRadius: "15px" }}
          >
            Create Snippet
          </ButtonCustomized>
        </Box>
        {/* {resourceList.results.map((s) => {
          return <CardNote key={s.id} />;
        })} */}
        <Grid
          container
          spacing={2}
          sx={{
            mt: 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {resourceList.results.map((s) => {
            return (
              <CardNote
                key={s.id}
                image={s.image}
                language={s.language}
                topic={s.topic}
                subtopic={s.subtopic}
                description={s.description}
                handleDelete={handleDelete}
                id={s.id}
              />
            );
          })}
        </Grid>
      </ThemeProvider>
    </div>
  );
}

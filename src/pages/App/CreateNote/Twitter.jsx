import React from "react";
import { Box, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Twitter({ username }) {
  return (
    <Box
      sx={{
        maxWidth: "200px",
        maxHeiht: "50px",
        WebkitBackdropFilter: "blur(15px)",
        backdropFilter: "blur(15px)",
        background:
          "linear-gradient(180deg,rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.8))",
        // bg: "#fff",

        p: 0.4,
        borderRadius: "10px",
        display: "flex",
        jusftifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "20px",
        left: "20px",
      }}
    >
      <TwitterIcon sx={{ color: "#1DA1F2", mr: 0.2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          jusftifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          suppressContentEditableWarning={true}
          contentEditable="true"
          onInput={(e) => handleChangeUsernameTwitter(e)}
          style={{
            color: "#1DA1F2",

            maxWidth: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.9rem",
              mr: 0.1,
            }}
          >
            {username ?? "@username"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

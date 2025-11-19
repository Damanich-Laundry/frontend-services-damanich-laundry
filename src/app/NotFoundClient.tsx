"use client";

import { Button, Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const NotFoundClient = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        mt: { xs: 25, md: 17 },
      }}
    >
      <Box>
        <Image alt="Page not found" src="/assets/not-found.png" width={400} height={300} />
      </Box>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Sorry! Page Not Found.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you are looking for does not exist.
        </Typography>
        <Button component={Link} href="/" variant="contained" sx={{ alignSelf: "center", mt: 2 }}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundClient;


import { Outlet } from "react-router-dom"
import { Navbar, Footer } from "../components"
import { Box } from "@mui/material"
import type { JSX } from "react"

const MainLayout = (): JSX.Element => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default MainLayout
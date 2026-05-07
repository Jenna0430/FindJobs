import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { HomePage,JobsPage, JobPage, AddJobPage, jobLoader, ApplyForJobPage, CompanyProfilePage, LoginPage } from "./pages"
import MainLayout from "./layouts/MainLayout"
import type { JSX } from "react"
import { RequireAuth } from "./components/RequireAuth"
import { AuthProvider } from "./context/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="jobs" element={<JobsPage />} />
      <Route path="jobs/:id" element={<JobPage />} loader={jobLoader} />

      {/* Protected routes */}
    
      <Route path="add-job" element={
        <RequireAuth>
        <AddJobPage />
        </RequireAuth>
        }/>
      <Route path="apply" element={
        <RequireAuth>
          <ApplyForJobPage />
        </RequireAuth>
      } />
      <Route path="company-profile" element={
        <RequireAuth>
          <CompanyProfilePage />
        </RequireAuth>
      } />
    </Route>
  )
)

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router}/>
   </AuthProvider>
   </QueryClientProvider>
  )
}

export default App
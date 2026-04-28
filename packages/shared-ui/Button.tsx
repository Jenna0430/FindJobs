
export const PrimaryButton = ({ label }: { label: string }) => (
   <Button sx={{ backgroundColor: "var(--primary-color)", color: "white" }} variant="contained">
    {label}
  </Button>
);
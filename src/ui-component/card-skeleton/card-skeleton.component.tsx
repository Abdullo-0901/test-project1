import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonComponent() {
  return (
    <Stack spacing={1}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={150}
        sx={{ borderRadius: 3 }}
      />

      <Stack spacing={1} direction="row">
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: 60, borderRadius: 1 }}
        />
      </Stack>

      <Stack spacing={1} direction="row" justifyContent="space-between">
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: 100 }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: 60 }} />
      </Stack>

      <Skeleton
        variant="text"
        sx={{ fontSize: "1rem", width: 210, height: 40 }}
      />

      <Stack spacing={1} direction="row" justifyContent="space-between">
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: 90, height: 40 }}
        />

        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: 90, height: 40 }}
        />
      </Stack>
    </Stack>
  );
}

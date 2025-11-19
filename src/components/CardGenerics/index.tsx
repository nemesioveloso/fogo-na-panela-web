import { Card, Grid, Icon, LinearProgress, Typography } from "@mui/material";

type MuiColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "disabled"
  | "action";

type StatCardData = {
  id: number;
  titulo: string;
  valor: string;
  icon: string;
  iconColor?: MuiColor | string;
  iconBackground?: string;
  caption?: string;
  subtitle?: string;
  subtitleColor?: MuiColor | string;
  progress?: number;
};

interface CardGenericsProps {
  data: StatCardData[];
}

export const CardGererics: React.FC<CardGenericsProps> = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid container spacing={2}>
        {data.map((item: StatCardData) => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <Card sx={{ padding: 4, minHeight: "180px" }} elevation={4}>
              <Grid container alignItems="center">
                <Grid size={12}>
                  <Typography variant="body2">{item.titulo}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 9, md: 9, lg: 10 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                    color="initial"
                  >
                    {item.valor}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 3, md: 3, lg: 2 }}>
                  <Icon
                    fontSize="large"
                    sx={{
                      background: item.iconBackground,
                      borderRadius: "6px",
                      color: item.iconColor,
                    }}
                  >
                    {item.icon}
                  </Icon>
                </Grid>
                <Grid size={12}>
                  <Typography variant="caption">{item.caption}</Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="subtitle2" color={item.subtitleColor}>
                    {item.subtitle}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <LinearProgress variant="determinate" value={item.progress} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

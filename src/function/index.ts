export function formatarHorario(datetime: string): string {
  return new Date(datetime).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

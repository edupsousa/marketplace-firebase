export default function formatarTempoDecorrido(data: number): string {
  const dataAtual = new Date();
  const dataPostagem = new Date(data);
  const diferenca = dataAtual.getTime() - dataPostagem.getTime();
  const diferencaEmSegundos = diferenca / 1000;
  const diferencaEmMinutos = diferencaEmSegundos / 60;
  const diferencaEmHoras = diferencaEmMinutos / 60;
  const diferencaEmDias = diferencaEmHoras / 24;
  const diferencaEmMeses = diferencaEmDias / 30;
  const diferencaEmAnos = diferencaEmMeses / 12;

  if (diferencaEmAnos >= 1) {
    return `${Math.floor(diferencaEmAnos)} ano(s) atrás`;
  } else if (diferencaEmMeses >= 1) {
    return `${Math.floor(diferencaEmMeses)} mês(es) atrás`;
  } else if (diferencaEmDias > 1) {
    return `${Math.floor(diferencaEmDias)} dias atrás`;
  } else if (diferencaEmHoras > 1) {
    return `${Math.floor(diferencaEmHoras)} horas atrás`;
  } else if (diferencaEmMinutos > 1) {
    return `${Math.floor(diferencaEmMinutos)} minutos atrás`;
  } else {
    return `agora mesmo`;
  }
}

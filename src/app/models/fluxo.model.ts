export class Fluxo {
  constructor(
    public crm: CRM,
    public situacao: string,
    public segmento: string,
    public consignado: boolean,
    public isPrioritario: boolean,
    public isCorrentista: boolean,
  ) {}
}

export class CRM {
  ag: string;
  cnpj: string;
  cpf: string;
  nome_cliente: string;
  nome: string;
  cc: string;
  tipo_identificacao: number;
  idIdentificacaoCrm: number;
  idCategoria: number;
  idGerente: number;
  prioritario: boolean;
  documento: string;
  segmento: string;
  situacao: string;
  correntista: boolean;
  consignado: boolean;
}

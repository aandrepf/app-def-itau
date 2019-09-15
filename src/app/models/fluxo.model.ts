export class Fluxo {
  constructor(
    public crm: CRM,
    public opcao: string,
    public situacao: string,
    public segmento: string,
    public consignado: string,
    public crmEncontrado: boolean,
    public isPrioritario: boolean,
    public correntista: boolean,
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
  consignado: string;
  status: boolean;
  error: string;
}

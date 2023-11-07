export default class Utils {
  static UnEnumCategoria(value) {
    switch (value) {
      case 0:
        return 'Importações';
      case 1:
        return 'Exportações';
      default:
        return value;
    }
  }

  static UnEnumTipoMovimentacao(value) {
    switch (value) {
      case 0:
        return 'Embarque';
      case 1:
        return 'Descarga';
      case 2:
        return 'Gate In';
      case 3:
        return 'Gate Out';
      case 4:
        return 'Reposicionamento';
      case 5:
        return 'Pesagem';
      case 6:
        return 'Scanner';
      default:
        return value;
    }
  }
}

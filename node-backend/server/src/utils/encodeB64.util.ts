class EncodeB64 {
  constructor() {}

  encodeInput(email: string, iden: string) {
    var encodedEmail = btoa(email);
    var encodedExpr = btoa(String(Date.now()));
    var encodedIden = btoa(iden);
    var encodedVar = `${encodedEmail}.${encodedExpr}.${encodedIden}`;

    return encodedVar;
  }

  decodeInput(encodedVar: string) {
    var encodedVarArr = encodedVar.split(".");
    var varArr: Array<String> = [];
    encodedVarArr.forEach((item) => {
      varArr.push(atob(item));
    });

    return varArr;
  }
}

export default EncodeB64;

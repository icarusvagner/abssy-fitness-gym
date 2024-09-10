class EncodeB64 {
  encodeInput(email: string, iden: string) {
    const encodedEmail = btoa(email);
    const encodedExpr = btoa(String(Date.now()));
    const encodedIden = btoa(iden);
    const encodedVar = `${encodedEmail}.${encodedExpr}.${encodedIden}`;

    return encodedVar;
  }

  decodeInput(encodedVar: string) {
    const encodedVarArr = encodedVar.split('.');
    const varArr: Array<string> = [];
    encodedVarArr.forEach((item) => {
      varArr.push(atob(item));
    });

    return varArr;
  }
}

export default EncodeB64;

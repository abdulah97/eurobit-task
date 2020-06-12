export class CustomDateFormat {
  static CustomDateFormat(enUsLocaleDateString: string): string {
    const dateToFormatConstArr: string[] = enUsLocaleDateString.split('/');
    const yearStr = dateToFormatConstArr[2];
    let monthStr = dateToFormatConstArr[0];
    let dayStr = dateToFormatConstArr[1];
    if (monthStr.length === 1) {
      monthStr = '0' + monthStr;
    }
    if (dayStr.length === 1) {
      dayStr = '0' + dayStr;
    }
    return yearStr + '-' + monthStr + '-' + dayStr;
  }
}

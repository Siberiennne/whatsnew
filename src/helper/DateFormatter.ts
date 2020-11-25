export class DateFormatter {

    static months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    public static formatDate(date: string): string {
        let dateArr = date.split('-');

        DateFormatter.validateDate(dateArr);

        let year: string = dateArr[0];
        let month: number = +dateArr[1];
        let day: string = dateArr[2];

        return day + ' ' + DateFormatter.months[month - 1] + ' ' + year;
    }

    private static validateDate(date: string[]) {
        DateFormatter.validateValue(date[0], 'Year');
        DateFormatter.validateValue(date[1], 'Month');
        DateFormatter.validateValue(date[2], 'Day');
    }

    private static validateValue(value: string, name: string) {
        let valueToNumber: number = +value;
        if (!valueToNumber) {
            throw new Error(name + ' ' + value + ' cannot be read');
        }
    }
}
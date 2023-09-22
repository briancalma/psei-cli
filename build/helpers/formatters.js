import moment from "moment";
export const formatMoneyToPHP = (amount) => {
    const formatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    });
    const formattedAmount = formatter.format(amount);
    return formattedAmount;
};
export const formatDate = (dateString) => {
    return moment(dateString).format("MMMM D, YYYY h:mm A");
};

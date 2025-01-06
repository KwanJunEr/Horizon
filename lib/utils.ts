import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string";
import z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// FORMAT DATE TIME
//Intl.DateTimeFormat is used to format date strings in JavaScript.
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  //format the dateString based on the options defined above

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number) : string{
  const formatter = new Intl.NumberFormat("en-US",{
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, 
  })
  return formatter.format(amount);
}

//create a deep clone of the provide value:
// It copies all the properties of the original object to a new object. If there are nested objects or arrays within the original object, they will be copied recursively, ensuring that the new object is completely independent of the original one.
export const parseStringify = (value : any) => JSON.parse(JSON.stringify(value));
//JSON.stringify --> converts the input value (which could be object) into JSON String
//JSON.parse --> takes JSON string and convert it back into Javascript Obejct 

//remove any special characters (except for alphanumberic chracters and spaces) from a given string
export const removeSpecialCharacters = (value: string)=>{
  return value.replace(/[^\w\s]/gi, "");
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({params, key, value} : UrlQueryParams){  //takes an object as an argument which is destructed into three properties
  const currentUrl = qs.parse(params); //takes string (e.g., "?name=John&age=30") and converts it into a JavaScript object.
  currentUrl[key] = value; //modifies currentUrl object by updating or adding the key-value pair.
  return qs.stringifyUrl( 
    {
      url: window.location.pathname,   // converts the updated JavaScript object (currentUrl) back into a query string, while also considering the window.location.pathname for the base URL. This forms the updated URL with the new query parameters.
      query: currentUrl,
    },  
    { skipNull: true } //exclue any query parameters with a null or undefined value from the resulting URL
  );
}
//Use case: useful when need to programmatically update the query parameters of the current URL, such as when user selects different filters or sorts on a page


export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url : string){
  // Split the URL string by '/'
  const parts = url.split("/");
  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];
  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date : Date) =>{
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
}

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
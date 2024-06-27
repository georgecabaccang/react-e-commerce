export type BackgroundColors = {
    default: string;
    red: string;
    gray: string;
};

const TAILWIND_CONTANTS = {
    // background colors
    hoverBackGroundColors: {
        default: "bg-[#4040FF] hover:bg-[#8080FF]",
        red: "bg-red-700 hover:bg-red-900",
        gray: "bg-gray-400 hover:bg-gray-200",
        lightGray: "bg-gray-200 hover:bg-gray-500:",
    },

    backGroundColors: {
        default: "bg-[#4040FF] hover:bg-[#4040FF] active:bg-[#8080FF]",
        red: "bg-red-700 hover:bg-red-700 active:bg-red-900",
        gray: "bg-gray-400 hover:bg-gray-400 active:bg-gray-200",
        lightGray: "bg-gray-200 hover:bg-gray-200 active:bg-gray-500",
        white: "bg-white hover:bg-white active:bg-gray-200",
    },

    fontColor: {
        default: "text-[#4040FF]",
        red: "text-red-700",
        gray: "text-gray-400",
        lightGray: "text-gray-200",
        white: "text-white",
    },

    fontSize: {
        thin: "font-thin",
        extraLight: "font-extralight",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semiBold: "font-semibold",
        bold: "font-bold",
        extraBold: "font-extrabold",
        black: "font-black",
    },

    height: {
        xs: "h-[2.3rem]",
        small: "h-[3.3rem]",
        medium: "h-[4.8rem]",
        large: "h-[6.1rem]",
        extraLarge: "h-[12rem]",
    },

    width: {
        xs: "w-[2.3rem]",
        short: "w-[3.3rem]",
        medium: "w-[4.8rem]",
        long: "w-[6.1rem]",
        extraLong: "w-[12rem]",
    },
};

export default TAILWIND_CONTANTS;

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Home {
    routerLink: string;
    color: string;
    cols: number;
    rows: number;
    text: string;
    needAdmin: boolean;
    img: string;
}

  export interface Catalogs {
    routerLink: string;
    text: string;
    icon: IconDefinition;
    needAdmin: boolean;
    img: string;
}
import {url} from './common';

export type banner = { color: string, img: string };
export type menus = { title: string, href: url }[];
export type shop = { banner: banner, menus: menus };
export type size = { title: string, value: string };
export type sizes = size[];
export type color = { img: string, value: string };
export type colors = color[];
export type goods = { title: string, price: number, true_price: number, offer: number, sizes: sizes, colors: colors };
export type magnifier = { thumbs: string[], bigs: string[], orgs: string[] };
export type detail = { info: string[], imgs: string[] };
export type detailItem = { shop: shop, goods: goods, magnifier: magnifier, detail: detail };

import {url} from './common';

export type filter = { q: string, type?: string, page?: number, sort?: string, min_price?: string, max_price?: string };
export type goodsData = { price: number, title: string, href: url, shophref: string, shopname: string, sales: string, img: string, ww_href: string };
export type c2cData = { rows: goodsData[], pagecount: number };
export type shopProduct = { href: string, img: string, price: number };
export type shopData = { shopID: string, shopHref: string, shopTitle: string, shopImg: string, shopRank: number, owener: string, ww_href: string, mainCat: string, infoSale: number, infoTotal: number, rate: string, products: shopProduct[] }
export type  goodsAdsItem = {href:url,img:string,price:number,sale:number,title:string};
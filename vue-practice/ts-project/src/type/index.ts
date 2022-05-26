import {url} from "@/type/common";

export type Suggest = { title: string, magic?: MagicData[] };
export type Suggests = { keyword: string, focus: boolean, active: number, suggests: Suggest[] };
export type MagicData = { title: string, type?: string }
export type MagicItem = { index: number, type: string, data: MagicData[] };
export type SuggestData = { result: string[][], magic?: MagicItem[] }
export type CatalogItem = { title: string, href: url }
export type CatalogData = CatalogItem[];
export type CatalogLink = { title: string, hot: boolean, href: url };
export type CatalogPanel = { title: string, links: CatalogLink[] }
export type CatalogRmd = { title: string, img: string, href: url };
export type CatalogDetail = { panels: CatalogPanel[], rmds: CatalogRmd[] };
export type BannerItem = { href: url, img: string };
export type AdItem = { href: url, img: string }
export type HotItem = { "href": url, "title": string, "img": string, "comment": number, "fav": number, "price": number, "sales": number }
export type HotKeyword={title:string,href:url};
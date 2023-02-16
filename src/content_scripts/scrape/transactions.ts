import {AccountRead} from "firefly-iii-typescript-sdk-fetch/dist/models/AccountRead";
import {getAccountElements, getAccountName, getOpeningBalance} from "./accounts";
import {priceFromString} from "../../common/prices";

export function getButtonDestination(): Element {
    return document.querySelector("div.content-links:first-child")!
}

/**
 * @param accounts The first page of account in your Firefly III instance
 */
export async function getCurrentPageAccount(
    accounts: AccountRead[],
): Promise<AccountRead> {
    const accountName = getAccountName(getAccountElements()[0]);
    return accounts.find(
        acct => acct.attributes.name === accountName,
    )!;
}

export function isPageReadyForScraping(): boolean {
    return true;
}

export function getRowElements(): Element[] {
    return getAccountElements();
}

export function getRowDate(el: Element): Date {
    return new Date();
}

function isRowLoading(r: Element): boolean {
    return false;
}

export function getRowAmount(pageAccount: AccountRead, r: Element): number {
    if (isRowLoading(r)) {
        throw new Error("Page is not ready for scraping")
    }
    const oldBal = priceFromString(pageAccount.attributes.currentBalance!);
    const pageBal = getOpeningBalance(getAccountElements()[0])?.balance;
    return pageBal! - oldBal;
}

export function getRowDesc(r: Element): string {
    return "Balance update";
}

export function findBackToAccountsPageButton(): HTMLElement {
    return undefined!;
}
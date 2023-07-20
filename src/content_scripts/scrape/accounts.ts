import {OpeningBalance} from "../../background/firefly_export";
import {priceFromString} from "../../common/prices";
import {extensionBankName} from "../../extensionid";
import {debugLog} from "../auto_run/debug";

export function getButtonDestination(): Element {
    let element = document.querySelector("#investment-main-content > div > div.workplace-investment > div.plan-accounts > div > div.account-header.header-end-line > div");
    debugLog("Will add account button to", element);
    return element!
}

export function isPageReadyForScraping(): boolean {
    let element = document.querySelector('#investment-main-content > div > div.workplace-investment > div.plan-accounts > div > div.accountDetails > div');
    if (!element) {
        debugLog("Page is not ready for scraping", element);
    }
    return !!element;
}

export function getAccountElements(): Element[] {
    let elements = Array.from(document.querySelectorAll("#investment-main-content > div > div.workplace-investment > div.plan-accounts").values());
    debugLog("Will scan account elements: ", elements);
    return elements;
}

export function shouldSkipScrape(accountElement: Element): boolean {
    return false;
}

export function getAccountName(
    accountElement: Element,
): string {
    let trimmed = accountElement.querySelector("a.product-name")!.textContent!
        .trim()
        .replace("\n", "")
        .replace("\t", "");
    return `${extensionBankName} - ${trimmed}`;
}

export function getOpeningBalance(
    accountElement: Element,
): OpeningBalance | undefined {
    return {
        accountNumber: "",
        accountName: getAccountName(accountElement),
        balance: priceFromString(
            accountElement.querySelector("span.account-fund-total")!.textContent!,
        ),
        date: new Date(),
    }
}
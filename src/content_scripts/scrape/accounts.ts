import {sha512} from "js-sha512";
import {OpeningBalance} from "../../background/firefly_export";
import {priceFromString} from "../../common/prices";

export function getButtonDestination(): Element {
    return document.querySelector("div.content-links:first-child")!
}

export function getAccountElements(): Element[] {
    return Array.from(document.querySelectorAll("div#workplace div.product-links div.row").values());
}

export function getAccountName(
    accountElement: Element,
): string {
    return accountElement.querySelector("div.prodName")!.textContent!
        .trim()
        .replace("\n", "")
        .replace("\t", "");
}

export function getOpeningBalance(
    accountElement: Element,
): OpeningBalance | undefined {
    return {
        accountNumber: "",
        accountName: getAccountName(accountElement),
        balance: priceFromString(
            accountElement.querySelector("div.balance-area")!.textContent!,
        ),
        date: new Date(),
    }
}
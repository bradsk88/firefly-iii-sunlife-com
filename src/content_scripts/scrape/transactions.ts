import {TransactionStore, TransactionTypeProperty} from "firefly-iii-typescript-sdk-fetch";
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

/**
 * @param pageAccount The Firefly III account for the current page
 */
export function scrapeTransactionsFromPage(
    pageAccount: AccountRead,
): TransactionStore[] {
    const oldBal = priceFromString(pageAccount.attributes.currentBalance!);
    const pageBal = getOpeningBalance(getAccountElements()[0])?.balance;
    const diff = Number(pageBal! - oldBal).toFixed(2);
    return [{
        errorIfDuplicateHash: true,
        transactions: [{
            type: TransactionTypeProperty.Deposit,
            description: "Balance update",
            destinationId: pageAccount.id,
            amount: `${diff}`,
            date: new Date(),
        }]
    }];
}
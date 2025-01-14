import { KlaxoonEvent } from "../types";
import { KlaxoonException } from "./Exception/KlaxoonException";

declare global {
    interface Window {
        KlaxoonActivityPicker: {
            openPicker: (arg1: {
                clientId: string;
                directSelection?: boolean;
                success: (arg1: KlaxoonEvent) => void;
                host?: string;
                options?: {
                    height?: number;
                    width?: number;
                };
            }) => void;
        };
    }
}

export const initWindowKlaxoonActivityPicker = () => {
    if (window.KlaxoonActivityPicker) {
        return;
    }
    /* eslint-disable */
    window.KlaxoonActivityPicker = {
        openPicker({ clientId: t, directSelection: e = !1, success: i, host: o = "go.klaxoon.com", options: c = {} }) {
            const n = Object.entries({ height: 940, left: 100, top: 100, width: 639, ...c, popup: !0 }),
                s = window.open(
                    `https://${o}/auth-ui?redirect=%2Factivity-picker%3FclientId%3D${t}%26directSelection%3D${e}`,
                    undefined,
                    n.map((t) => t.join("=")).join(",")
                );
            window.addEventListener(
                "AcitivityPickerFromWorkAdventure",
                function (t: any) {
                    const { type: e, payload: o } = t.data;
                    "activity-picker-result" === e && (i(o), s?.close());
                },
                { once: !0 }
            );
        },
    };
    /* eslint-enable */

    console.info(
        "A new function was added into the browser winddow: KlaxoonActivityPicker",
        window.KlaxoonActivityPicker
    );
};

export const openKlaxoonActivityPicker = (clientId: string, successCallback: (arg1: KlaxoonEvent) => void) => {
    window.KlaxoonActivityPicker.openPicker({
        // eslint-disable-line
        clientId: clientId,
        success: successCallback,
        options: {
            height: 940,
            width: 639,
        },
    });
    // TODO delete after test
    /*setTimeout(() => {
        window.postMessage(
            {
                type: "activity-picker-result",
                payload: {
                    access_code: "KXEWMSE3NF2M",
                    author: {firstname: 'Klaxoon', lastname: 'Academy'},
                    imageUrl: "https://app.klaxoon.com/manager/media/cache/200c/mediabundle/71/7112410a023fefe90e955d37b7417623.jpg",
                    lang: "fr",
                    title: "Feedback is a gift ! Nous serions ravis d'avoir votre avis sur la Klaxoon Academy.",
                    type: "survey",
                    url: "https://app.klaxoon.com/join/KXEWMSE3NF2M?from=aG3stVtZnDmhrhqKc17to1OlfvyyEUeV"
                },
            },
            "*"
        );
    }, 1000);*/
};

// Create function to get url with embedded parameter
export const getKlaxoonEmbedUrl = (url: URL): string => {
    // if the link is not a klaxoon link, throw an exception
    if (!isKlaxoonLink(url)) {
        throw new KlaxoonException();
    }

    if (url.searchParams.get("from") === "embedded") {
        return url.toString();
    }
    url.searchParams.set("from", "embedded");
    return url.toString();
};

// create function to check if the link is a Klaxoon link
export const isKlaxoonLink = (url: URL): boolean => {
    return url.hostname === "app.klaxoon.com";
};

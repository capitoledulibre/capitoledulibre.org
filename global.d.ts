interface Window {
    $: any;
    jQuery: any;
}

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['pretalx-schedule']: CustomElement<XAlert>;
        }
    }
}